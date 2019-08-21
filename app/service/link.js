'use strict';

const Service = require('egg').Service;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {generateGuid_16} = require('../../libs/util')
class Link extends Service {
    /**
     * 增加链接
     */
    async createLink(inputParam) {
        console.log('----增加链接----', inputParam);
        let linksInfo = await this.ctx.model.Link.findOne({
            where: {
                linkAddress: inputParam.linkAddress
            },
            force: true,
            raw: true
        })
        console.log('+++++',linksInfo);
        if (linksInfo) {
            this.ctx.throw(404, '已有该链接');
        }
        inputParam.id = generateGuid_16()
        let linkInfo = await this.ctx.model.Link.create(inputParam);
        return linkInfo;
    }

    /**
     * 查询所有链接  分页 | 无分页
     */
    async findAllLink(inputParam) {
        console.log('----查询所有链接---');
        if(!inputParam){
            let linkInfo = await this.ctx.model.Link.findAndCountAll({force: true,raw: true});
            return linkInfo;
        }
        let { pageSize, pageNum, linkName, linkType} = inputParam;
        let linksInfo;
        if (!linkName && !linkType){
            linksInfo = await this.ctx.model.Link.findAndCountAll({
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                raw: true
            })
        }
        if(linkName && !linkType){
            linksInfo = await this.ctx.model.Link.findAndCountAll({
                where: {
                    linkName: {
                        [Op.like]:'%' +linkName + '%'
                    }
                },
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                raw: true
            })
        }else if (!linkName && linkType){
            linksInfo = await this.ctx.model.Link.findAndCountAll({
                where: {
                    linkType: {
                        [Op.like]:'%' +linkType + '%'
                    }
                },
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                raw: true
            })
        }else if(linkName && linkType){
            linksInfo = await this.ctx.model.Link.findAndCountAll({
                where: {
                    linkName: {
                        [Op.like]:'%' +linkName + '%'
                    },
                    linkType: {
                        [Op.like]:'%' +linkType + '%'
                    }
                },
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                raw: true
            })
        }
        console.log('--- 前端链接 ---',linksInfo);
        return linksInfo;
    }

    /**
     * 
     * @param {查找链接数量} inputParam 
     */
    async findCount() {
        let linkInfo = await this.ctx.model.Link.count({
            raw: true
        });
        console.log('-----', linkInfo);
        return linkInfo;
    }

    /**
     * 通过ID查链接
     * @param {*} linkId 
     */
    async findOneById(linkId){
        let linkInfo = await this.ctx.model.Link.findOne({
            where: {
                id: linkId
            },
            force: true,
            raw: true
        })
        return linkInfo;
    }

    /**
     * 删除链接
     * @linkId   链接主键ID
     */
    async deleteLink(linkId) {
        console.log('---删除链接---', linkId);
        let linksInfo = await this.ctx.model.Link.findOne({
            where: {
                id: linkId
            },
            force: true,
            raw: true
        })
        if (!linksInfo) {
            this.ctx.throw(404, '没有该链接');
        }
        let linkInfo = await this.ctx.model.Link.destroy({
            where: {
                id: linkId
            },
            force: true,
            raw: true
        });
        return linkInfo;
    }
}

module.exports = Link;