/**
 * 参数验证中间件，用于验证并把参数处理成为指定的格式
 * @description rule为参数规则，具体结构参见libs/validator文件
 * @version 1.0.20180909
 */
'use strict';


const _ = require('lodash');
const validator  = require('../../libs/validator');  // 参数验证器
const argsFilter = require('../../libs/argfilter'); // 参数过滤器
const { Controller } = require('egg');
const checkInput = require('../../libs/checkInput');
class BaseController extends Controller {
    success(msg, data) {
        let args = argsFilter.getArguments(arguments, {
            msg: {
                type: 'string',
                optional: true,
                value: '请求成功'
            },
            data: {
                type: 'any',
                optional: true,
                value: {}
            }
        });
        args.status = 200;
        args.code = 0;
        this.ctx.body = args;
        return;
    }
    fail(msg, status, data) {
        let args = argsFilter.getArguments(arguments, {
            msg: {
                type: 'string',
                optional: true,
                value: '请求失败'
            },
            status: {
                type: 'number',
                optional: true,
                value: 204,
                integer: true
            },
            data: {
                type: 'any',
                optional: true,
                value: {}
            }
        });
        args.code = -1;
        this.ctx.body = {
            status: args.status,
            msg: args.msg,
            data: args.data
        }
    }
    paramsValidate(rule) {
        // let params = _.assign({}, this.ctx.request.body, this.ctx.query);
        // console.log('--- 请求内容 ---',this.ctx.request.header.token);
        
        let params = _.assign({}, this.ctx.request.body, this.ctx.request.body.data, this.ctx.query);
        console.log('--- 请求内容post ---',params);
        let tmp = {};
        console.log('rule ', rule);
        let inputResult = checkInput(rule, params)
        if(inputResult && inputResult.length > 0){
            this.ctx.throw(401, '操作失败，缺少参数:'+inputResult);
        }
        for (let key in rule) {
            let pKey = rule[key].mapKey ? rule[key].mapKey : key;
            if (typeof params[pKey] !== 'undefined') {
                tmp[key] = params[pKey];
            }
        }
        params = tmp;
        // 验证并得到验证结果
        let result = validator(params, rule);
        if (result.error) {
            this.ctx.logger.error(`${this.ctx.url} paramsValidate error: ${result.error}`);
            throw new Error(result.error);
            return;
        }

        let paramsTmp = {};
        let data = result.data;

        for (var key in data) {
            if (data.hasOwnProperty(key) && !_.isUndefined(data[key]) && !_.isNaN(data[key])) {
                paramsTmp[key] = data[key];
            }
            // if need parse so this is a  object so check this object key
            if (rule[key].needParse && paramsTmp[key] && rule[key].needKeys) {

                for (let i = 0; i < rule[key].needKeys.length; i++) {
                    let pkey = rule[key].needKeys[i];
                    if (_.isUndefined(paramsTmp[key][pkey])) {
                        this.ctx.logger.error(`${this.ctx.url} paramsValidate error: ${key} 参数没有包含必须的 ${pkey}`);
                        throw new Error(`${this.ctx.url} paramsValidate error: ${key} 参数没有包含必须的 ${pkey}`);
                    }
                }

            }

        }

        this.params = paramsTmp;
    }
}

module.exports = BaseController;
