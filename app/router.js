'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

 let {login} = require('./swagger');

module.exports = app => {
  const { router, controller, swagger } = app;
  router.get('/', controller.home.index);
  router.post('/login',controller.admin.login);
  router.post('/register',controller.admin.register);


  /**
   * swagger 配置
   */
  swagger.post('/login', login);
};
