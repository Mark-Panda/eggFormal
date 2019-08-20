'use strict';

const Service = require('egg').Service;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
class Label extends Service {
    /**
     * 增加分类
     */
    async createLabel(inputParam) {
        console.log('----增加分类----', inputParam);
        let labelsInfo = await this.ctx.model.Label.findOne({
            where: inputParam,
            force: true,
            raw: true
        })
        console.log('+++++',labelsInfo);
        if (labelsInfo) {
            this.ctx.throw(404, '已有该标签');
        }
        let labelInfo = await this.ctx.model.Label.create(inputParam);
        return labelInfo;
    }

    /**
     * 查询所有标签  分页 | 无分页
     */
    async findAllLabel(inputParam) {
        console.log('----查询所有标签---');
        if(!inputParam){
            let labelInfo = await this.ctx.model.Label.findAll({force: true,raw: true});
            return labelInfo;
        }
        let { pageSize, pageNum, labelName} = inputParam;
        let labelInfo;
        if(labelName){
            labelInfo = await this.ctx.model.Label.findAll({
                where: {
                    labelName: {
                        [Op.like]:'%' +labelName + '%'
                    }
                },
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                raw: true
            })
        }else{
            labelInfo = await this.ctx.model.Label.findAll({
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                raw: true
            })
        }
        return labelInfo;
    }

    /**
     * 
     * @param {查找标签数量} inputParam 
     */
    async findCount() {
        let labelInfo = await this.ctx.model.Label.count({
            raw: true
        });
        console.log('-----', labelInfo);
        return labelInfo;
    }

    /**
     * 通过ID查标签
     * @param {*} labelId 
     */
    async findOneById(labelId){
        // console.log('---分类ID---', labelId);
        let labelInfo = await this.ctx.model.Label.findOne({
            where: {
                id: labelId
            },
            force: true,
            raw: true
        })
        return labelInfo;
    }

    /**
     * 删除标签
     * @labelId   标签主键ID
     */
    async deleteLabel(labelId) {
        console.log('---删除分类---', labelId);
        let labelsInfo = await this.ctx.model.Label.findOne({
            where: {
                id: labelId
            },
            force: true,
            raw: true
        })
        if (!labelsInfo) {
            this.ctx.throw(404, '没有该标签');
        }
        let labelInfo = await this.ctx.model.Label.destroy({
            where: {
                id: labelId
            },
            force: true,
            raw: true
        });
        return labelInfo;
    }
}

module.exports = Label;