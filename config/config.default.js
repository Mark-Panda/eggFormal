/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1563343147454_7049';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.sequelize = {
    dialect: 'mysql',
    database: 'simple',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'simple_95@mxf',
  };

  // redis config
  config.redis = {
    clients: {
      user: { // instanceName. See below
        port: 6379, // Redis port
        host: '127.0.0.1',
        password: 'Founder123',
        db: 0,
      },
      main: {
        port: 6379,
        host: '127.0.0.1',
        password: 'Founder123',
        db: 1,
      },
      check: {
        port: 6379,
        host: '127.0.0.1',
        password: 'Founder123',
        db: 2,
      },
    }
  }

  config.security = {
    // ignore: "/api/",
    domainWhiteList: [
      "http://127.0.0.1:8088",
      "http://127.0.0.1:7001",
    ],
    methodnoallow: {
      enable: false
    },
    csrf: {
      enable: false,
      // ignoreJSON: false // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    }
  };
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  // 用户 token 缓存设置
  config.userInfo = {
    userTokenTimeLimit: 3600 * 24, // 有效期
    redis: 'user' // 使用哪个db 注： redis 启动后 有 0 - 15 个db
  }

  const swagger2 = {
    enable: true, // 禁用swagger , 默认为true
    base: {
      info: {
        description: 'This is a test swagger-ui html',
        version: '1.0.0',
        title: 'TEST',
        contact: {
          email: 'caandoll@aliyun.com',
        },
        license: {
          name: 'Apache 2.0',
          url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
        },
      },
      tags: [],
      definitions: {},
      securityDefinitions: {}
    },
  };


  return {
    swagger2,
    ...config,
    ...userConfig,
  };
};