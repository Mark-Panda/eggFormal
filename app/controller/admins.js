'use strict';
const util = require('../../libs/util');
const Controller = require('../core/base_controller');

module.exports = app => {
    let methodParm = {
        topLogo: {
            role: 'admins',
            registerAdmin: {
                param: {
                    userName: {
                        type: 'string'
                    },
                    phone: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    },
                    realName: {
                        type: 'string',
                        optional: true
                    }
                },
                ginseng: {
                    code: {
                        type: 'int'
                    },
                    message: {
                        type: 'string'
                    }
                },
                rule: {
                    desc: '注册',
                    url: '',
                    middwareMethod: '',
                    method: 'register'
                }
            },
            loginAdmin: {
                param: {
                    userName: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    }
                },
                ginseng: {
                    code: {
                        type: 'int'
                    },
                    message: {
                        type: 'string'
                    }
                },
                rule: {
                    desc: '登录',
                    url: '',
                    middwareMethod: '',
                    method: 'login'
                }
            },
            logOutAdmin:{
                param: {
                    userId: {
                        type: 'string'
                    },
                    token: {
                        type: 'string'
                    },
                },
                ginseng: {
                    msg: {
                        type: 'string'
                    },
                    data: {
                        type: 'object'
                    },
                    status: {
                        type: 'int'
                    },
                    code: {
                        type: 'int'
                    },
                },
                rule: {
                    desc: '注销登录',
                    url: '',
                    middwareMethod: '',
                    method: 'logOut'
                }
            }
        }

    }
    app.loadApiswagger(methodParm);
    class AdminController extends Controller {

        // 注册
        async registerAdmin() {
            this.paramsValidate(methodParm.topLogo.registerAdmin.param); //状态码  201 参数错误

            const userid = util.onlyId();
            this.params.userid = userid;

            try {
                console.log('注册管理员入参:', this.params);
                let findJson = {
                    where: {
                        userName: this.params.userName
                    }
                }
                console.log('findJson', findJson);
                let data = await this.ctx.service.admin.findWithJson(findJson);
                if (data) {
                    this.fail('用户已存在', data);
                    return;
                }
                data = await this.ctx.service.admin.create(this.params);
                this.success('注册成功', data)
            } catch (e) {
                this.ctx.logger.error('注册异常: ', e);
                this.fail('注册失败', e);
            }

        }

        /**
         * login 登录
         */
        async loginAdmin() {
            console.log('进入login');
            this.paramsValidate(methodParm.topLogo.loginAdmin.param);
            console.log(this.params);
            let {
                userName,
                password
            } = this.params;
            let {
                ctx
            } = this;

            let findJson = {
                where: {
                    userName: userName
                }
            }
            const admin = await this.ctx.service.admin.findWithJson(findJson);

            console.log('admin', admin);
            if (!admin) {
                this.fail('用户不存在');
                return;
            }

            let compareResult = ctx.helper.comparePassord(password, admin.password);
            console.log('compareResult', compareResult);
            if (!compareResult) {
                this.fail('密码错误');
                return;
            }
            // console.log(admin);
            let data =await this.ctx.service.userRedis.addUser(admin.userid); // add data to redis
            data.userName = admin.userName;
            data.phone = admin.phone;
            data.currentAuthority = 'admin';
            this.success('登陆成功', data);
        }

        // logout 注销登录
        async logOutAdmin() {
            let userInfo = this.ctx.request.body;
            console.log('--userInfo--', this.ctx.request.body);
            try {
                await this.ctx.service.userRedis.delUser(userInfo); // delete data in redis  userInfo包括userId , token
                this.success('登出成功');
            } catch (e) {
                this.ctx.logger.error('login error: ', e);
                this.fail('注销失败')
            }

        };
    }

    return AdminController;

}