'use strict';
const util= require('../../libs/util');
const Controller = require('../core/base_controller');

module.exports = app => {


    class AdminController extends Controller {

        // 注册
        async register() {
            let registerRuler = {
                userName: {type: 'string'},
                phone: {type: 'string'},
                password: {type: 'string'},
                realName: {type: 'string',optional: true}
            }

            // let swaggerRuler = {
            //     registerRulers: registerRuler,
            //     role: 'admin',
            //     desc: '',
            //     url: '',

            // }
            // app.loadApiswagger(swaggerRuler)
            this.paramsValidate(registerRuler); //状态码  201 参数错误
    
            const userid=util.onlyId();
            this.params.userid=userid;
    
            try {
                console.log('注册管理员入参:',this.params);
                let findJson = {
                    where: {
                        userName: this.params.userName
                    }
                }
                console.log('findJson',findJson);
                let data = await this.ctx.service.admin.findWithJson(findJson);
                if(data){
                    this.fail('用户已存在', data);
                    return;
                }
                data = await this.ctx.service.admin.create(this.params);
                this.success('注册成功', data)
            } catch (e) {
                this.ctx.logger.error('注册异常: ', e);
                this.fail('注册失败',e);
            }
    
        }
    
        /**
         * login 登录
         */
        async login() {
            let registerRuler = {
                userName: {type: 'string'},
                password: {type: 'string'}
            }
            console.log('进入login');
            this.paramsValidate(registerRuler);
            console.log(this.params);
            let { userName, password} = this.params;
            let { ctx } = this;
    
            let findJson = {
                where: {
                    userName: userName
                }
            }
            const admin = await this.ctx.service.admin.findWithJson(findJson);
    
            console.log('admin',admin);
            if (!admin) {
                this.fail('用户不存在');
                return;
            }
    
            let compareResult = ctx.helper.comparePassord(password, admin.password);
            console.log('compareResult',compareResult);
            if (!compareResult) {
                this.fail('密码错误');
                return;
            }
            console.log(admin);
            // let data =await this.ctx.service.adminData.addAdmin(admin.userid); // add data to redis
            
            this.success('登陆成功', data);
        }
    }
    
    return AdminController;
    
}

