'use strict';

const _ = require('lodash');

/* this will hook when app start

name: 'apiCheck',
desc: '服务api检测',
namespace: 'check',
endable: true, // 这里要处理和外面的 enable 的关系

middlewares: ['customResult'],     // 这里搞字符串
url: '/server/check',
ruler: {
    name: { type: 'string', desc: '测试参数name', value: '' },
    age: {
        type: 'string', desc: '测试参数age',
        value: 1,       // 这里不使用表达式，会有问题, 如果需要一个即时数值，可以考虑使用函数
    }
} */

module.exports = app => {


    // 加载接口 配置
    /* app.apiConfigList = {}
    let checkMap = {};

    app.loadApiConfig = function(apiConfig) {

        if (!app.apiConfigList[apiConfig.namespace]) {
            app.apiConfigList[apiConfig.namespace] = {}
        }
        apiConfig.middlewares = apiConfig.middlewares ? apiConfig.middlewares : [];
        if (checkMap[apiConfig.name]) {
            throw new Error(`${apiConfig.name} api 命名重复`)
        } else {
            checkMap[apiConfig.name] = true
        }
        app.apiConfigList[apiConfig.namespace][apiConfig.name] = apiConfig
    }

    app.loadApiswagger = function(swaggeConfig){

    } */

};
