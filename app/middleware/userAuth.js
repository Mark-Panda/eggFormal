'use strict'
/**
 * 中间 获取 用户信息，可以传入 needLogin 选项 如果 是 true 那没有 token 就会报错，
 * 如果 有 token 存在于 body 或者 query 对象之中， 那就去 redis 取 userinfo 数据。
 * @version 1.0.20180909
 */
const _ = require('lodash');

module.exports = (options) => {

    return async function userAuth(ctx, next) {
        ctx.logger.debug('-----------userAuth---------');
        ctx.userInfo = {};
        ctx.hasUserInfo = false;

        ctx.ownMidHandleError = function (status, msg, data) {
            ctx.body = {
                status: status,
                msg: msg,
                data: data,
                code: status
            };
        }


        const token = ctx.query.token || ctx.request.body.token || ctx.request.header["token"] || ctx.request.header['access-token'];
        let needLogin = _.isUndefined(options.needLogin) ? true : options.needLogin;

        if (!token && needLogin) {
            ctx.userInfo = {};
            ctx.ownMidHandleError(401, "need token");
            return; // will direct return ctr fun and after function is band
        }
        // find user in redis
        if (token) {
            let usrData = await ctx.service.userData.getRaw(token);
            if (needLogin && !usrData) {
                let errMsg = usrData == -1 ? `token失效，已经在其他地方重复登陆` : `token 错误`;
                ctx.ownMidHandleError(401, errMsg);
                return;
            }
            ctx.userInfo = usrData;
            ctx.userToken = token;
            ctx.hasUserInfo = true;
        }

        await next();
    };
};