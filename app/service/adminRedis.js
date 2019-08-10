'use strict';


const curVersion = 1; //当前用户数据版本

module.exports = app => {
    const config = app.config.userInfo;
    // 关联的redis
    const redis = app.redis.get(config.redis || 'user');
    // user data in redis time limit
    const timeLimit = config.userTokenTimeLimit || 3600 * 24;

    class userRedisdata extends app.Service {
        constructor(ctx) {
            super(ctx);
        };
        /**
         * redis存放信息规则
         * @param {key值为token，value存放用户信息，包括userId,token,IP ,mechanismId}  
         * @param {key值为userID，value存放对应的token信息} 
         */

        /**
         * 获取用户数据
         * @param {参数为token} token 
         */
        async getRaw(token) {
            let redisTokenKey = `t:${token}`;
            //通过token获取用户数据
            let raw = await redis.get(redisTokenKey);
            if (!raw) {
                return null;
            }
            let userData = this.ctx.helper.safeParse(raw);

            // 检查用户数据版本
            if (userData.version == curVersion) {
                // 删除无效数据
                if (userData.userId < 0) {
                    await redis.del(redisTokenKey);
                    return -1
                    // TODO: save new userinfo
                } else {
                    // 更新持续时间
                    await redis.expire(redisTokenKey, timeLimit);
                    await redis.expire(`a:${userData.userId}`, timeLimit);
                }

            } else if (userData.version > curVersion) {
                throw new Error('用户数据版本高于当前服务器版本，请及时更新服务器');
            } else {
                // 更新用户数据 version;
                userData = await this.createUserInfo(userData);
                await redis.set(redisTokenKey, JSON.stringify(userData), 'EX', timeLimit);
            }
            return userData;
        };
        /**
         * 登陆时添加用户
         * @param {参数为userId} userId 
         * @param {参数为mechanismId} mechanismId 
         */
        async addUser(userId, mechanismId) {
            // 获取用户的旧 token
            const oldToken = await redis.get(`a:${userId}`);
            // 创建用户数据的基本格式
            let info = {
                userId: userId,
                token: '',
                ip: this.ctx.ip,
                mechanismId,
                version: curVersion,
            };
            // TODO: 标记旧用户，使之可以在上线时得到提醒
            if (oldToken) {
                info.userId = -1;
                await redis.set(`t:${JSON.parse(oldToken)}`, JSON.stringify(info), 'EX', timeLimit);
            }
            // 获取新数据
            info.token = this.ctx.helper.createToken(userId); //创建新的token
            info.userId = userId;

            let raw = info;

            // 写入缓存
            if (raw) {
                await redis.set(`t:${raw.token}`, JSON.stringify(raw), 'EX', timeLimit);
                await redis.set(`a:${raw.userId}`, JSON.stringify(raw.token), 'EX', timeLimit);
            }
            return raw;
        }

        // 登出时删除用户
        async delUser(userInfo) {
            try {
                await redis.del(`a:${userInfo.userId}`);
                await redis.del(`t:${userInfo.token}`);
            } catch (e) {
                this.ctx.logger.error('del redis user :', e.message);
            }

        };

        // 获取用户 token
        async getToken(userId) {
            let token = await redis.get(`a:${userId}`);
            if (token) {
                return JSON.parse(token);
            }
            return null;
        };

        // 更新用户数据
        async updateUserInfo(tokon) {
            let info = await redis.get(`g:${tokon}`);
            if (!info) {
                return null;
            }
            info = JSON.parse(info);
            if (info.userId < 0) {
                return null;
            }
            // 创建用户数据
            let raw = await this.createUserInfo(info);
            // 写入缓存
            if (raw) {
                await redis.set(`t:${raw.tokon}`, JSON.stringify(raw), 'EX', timeLimit);
                await redis.set(`a:${raw.userId}`, JSON.stringify(raw.tokon), 'EX', timeLimit);
            }
        }
        // 创建用户数据
        async createUserInfo(info) {
            info.version = curVersion;
        };
    }
    return userRedisdata;
}