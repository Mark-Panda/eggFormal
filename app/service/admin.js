'use strict';

const Service = require('egg').Service;

class Admin extends Service {

    /**
     * 查找用户
     * @param {查找条件} queryJson 
     */
    async findWithJson(queryJson) {
        queryJson.raw = true;
        console.log('queryJson ---- ', queryJson);
        const admin = await this.ctx.model.Admin.findOne(queryJson);
        console.log('admin ', admin);
        return admin;
    }

    /**
     * 创建管理员用户
     */
    async create(admin) {
        if (admin.password) {
            admin.password = this.ctx.helper.encrypt(admin.password)
        }
        console.log('admin', admin);
        let data = await this.ctx.model.Admin.create(admin);
        return data;
    }

}

module.exports = Admin;