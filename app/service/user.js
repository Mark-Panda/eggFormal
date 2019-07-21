'use strict';

const Service = require('egg').Service;

class User extends Service {

    /**
     * 查找用户
     * @param {查找条件} queryJson 
     */
    async findWithJson(queryJson) {
        queryJson.raw = true;
        console.log('queryJson ---- ', queryJson);
        const admin = await this.ctx.model.User.findOne(queryJson);
        console.log('admin ', admin);
        return admin;
    }

    /**
     * 创建用户
     */
    async createUser(user) {
        if (user.password) {
            user.password = this.ctx.helper.encrypt(user.password)
        }
        console.log('user', user);
        let data = await this.ctx.model.User.create(user);
        return data;
    }

    /**
     * 更新用户信息
     */
    async updateInfo(id, updateInfo) {
        const user = await this.ctx.model.User.findById(id);
        if (!user) {
            this.ctx.throw(404, '没有找到该用户');
        }
        return user.update(updateInfo);
    }

    /**
     * 更新用户密码
     */
    async updatePass(id, password) {
        password = this.ctx.helper.encrypt(password)

        return await this.ctx.model.User.update({
            password: password
        }, {
            where: {
                id: id
            }
        });
    }

    /**
     * 注销用户
     */
    async deleteInfo(id) {
        const user = await this.ctx.model.User.findById(id);
        if (!user) {
            this.ctx.throw(404, '没有找到该用户');
        }
        return user.destroy();
    }

    /**
     * check user is exist with phone
     */
    async checkUserExistWithPhoneAndMechId(phone, mechanismId) {
        let findJson = {
            where: {
                phone: phone,
                mechanismId
            }
        };
        let user = await this.findWithJson(findJson);
        if (user) {
            return {
                code: 1,
                user: user
            };
        }
        return {
            code: 0
        };
    }

    
}

module.exports = User;