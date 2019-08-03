'use strict';
const util = require('../../libs/util');
const Controller = require('../core/base_controller');

module.exports = app => {
    let methodParm = {
        topLogo: {
            role: 'user',
            register: {
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
                    },
                    mechanismId: {
                        type: 'string',
                        optional: true
                    }
                },
                ginseng: {
                    msg: {
                        type: 'string'
                    },
                    data: {
                        id: {
                            type: 'int'
                        },
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
                            type: 'string'
                        },
                        mechanismId: {
                            type: 'string'
                        },
                        userid: {
                            type: 'string'
                        },
                        updatedAt: {
                            type: 'string'
                        },
                        createdAt: {
                            type: 'string'
                        },
                    },
                    status: {
                        type: 'int'
                    },
                    code: {
                        type: 'int'
                    },
                },
                rule: {
                    desc: '用户注册接口',
                    url: '',
                    middwareMethod: '',
                    method: 'register'
                }
            },
            login: {
                param: {
                    userName: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    },
                    mechanismId: {
                        type: 'string',
                        optional: true
                    }
                },
                ginseng: {
                    msg: {
                        type: 'string'
                    },
                    data: {
                        userId: {
                            type: 'string'
                        },
                        token: {
                            type: 'string'
                        },
                        ip: {
                            type: 'string'
                        },
                        version: {
                            type: 'int'
                        },
                        userName: {
                            type: 'string'
                        },
                        phone: {
                            type: 'string'
                        },
                    },
                    status: {
                        type: 'string'
                    },
                    code: {
                        type: 'int'
                    }
                },
                rule: {
                    desc: '用户登录接口',
                    url: '',
                    middwareMethod: '',
                    method: 'login'
                }
            },
            updatePassword: {
                param: {
                    phone: {
                        type: 'string'
                    },
                    newPassword: {
                        type: 'string'
                    },
                    oldPassword: {
                        type: 'string'
                    },
                    mechanismId: {
                        type: 'string',
                        optional: true
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
                    desc: '用户修改密码接口',
                    url: '',
                    middwareMethod: '',
                    method: 'updatePassword'
                }
            },
            forgetPassword: {
                param: {
                    phone: {
                        type: 'string'
                    },
                    newPassword: {
                        type: 'string'
                    },
                    code: {
                        type: 'string'
                    },
                    mechanismId: {
                        type: 'string',
                        optional: true
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
                    desc: '用户忘记密码接口',
                    url: '',
                    middwareMethod: '',
                    method: 'forgetPassword'
                }
            },
            logOut: {
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
    class UserController extends Controller {

        // 注册
        async register() {
            this.paramsValidate(methodParm.topLogo.register.param); //状态码  201 参数错误

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
                let data = await this.ctx.service.user.findWithJson(findJson);
                if (data) {
                    this.fail('用户已存在', data);
                    return;
                }
                data = await this.ctx.service.user.createUser(this.params);
                this.success('注册成功', data);
            } catch (e) {
                this.ctx.logger.error('注册异常: ', e);
                this.fail('注册失败', e);
            }

        }

        /**
         * login 登录
         */
        async login() {
            console.log('进入login');
            this.paramsValidate(methodParm.topLogo.login.param);
            try {
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
                const user = await this.ctx.service.user.findWithJson(findJson);

                console.log('user', user);
                if (!user) {
                    this.fail('用户不存在');
                    return;
                }

                let compareResult = ctx.helper.comparePassord(password, user.password);
                console.log('compareResult', compareResult);
                if (!compareResult) {
                    this.fail('密码错误');
                    return;
                }
                console.log(user);
                let data = await this.ctx.service.userRedis.addUser(user.userid); // add data to redis,有mechanismId还需要传mechanismId
                console.log(
                    'addUser ---- ', data
                );
                data.userName = user.userName;
                data.phone = user.phone;
                this.success('登陆成功', data);
            } catch (e) {
                console.log(e);
                this.ctx.logger.error('login error: ', e);
                this.fail('登陆失败')
            }

        }

        // logout 注销登录
        async logOut() {
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

        // update password  修改密码
        async updatePassword() {
            this.paramsValidate(methodParm.topLogo.updatePassword.param);

            try {
                // this.params.mechanismId = this.ctx.mechanismId;
                console.log('----this.params----', this.params);
                let {
                    phone,
                    newPassword,
                    mechanismId,
                    oldPassword
                } = this.params;
                let {
                    ctx
                } = this;

                const result = await this.ctx.service.user.checkUserExistWithPhoneAndMechId(phone, mechanismId);
                if (result.code == 0) {
                    this.fail('用户不存在');
                    return;
                }

                let {
                    user
                } = result;
                let compareResult = ctx.helper.comparePassord(oldPassword, user.password);
                if (!compareResult) {
                    this.fail('密码错误');
                    return;
                }
                const updateRes = await this.ctx.service.user.updatePass(user.id, newPassword);

                this.success('成功');
            } catch (e) {
                this.ctx.logger.error('修改密码失败 error: ', e);
                this.fail('失败')
            }
        };

        // forget password  忘记密码
        async forgetPassword() {
            this.paramsValidate(methodParm.topLogo.forgetPassword.param);

            try {
                // this.params.mechanismId = this.ctx.mechanismId;

                let {
                    phone,
                    newPassword,
                    mechanismId
                } = this.params;
                let {
                    ctx
                } = this;

                const result = await this.ctx.service.user.checkUserExistWithPhoneAndMechId(phone, mechanismId);
                if (result.code == 0) {
                    this.fail('用户不经存在');
                    return;
                }

                let {
                    user
                } = result;

                const updateRes = await this.ctx.service.user.updatePass(user.id, newPassword);

                this.success('成功');
            } catch (e) {
                this.ctx.logger.error('重置密码失败 error: ', e);
                this.fail('重置密码失败')
            }
        };
    }

    return UserController;

}