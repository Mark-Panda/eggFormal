'use strict';

const Service = require('egg').Service;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
class Classification extends Service {
    /**
     * 增加分类
     */
    async createClassification(inputParam) {
        console.log('----增加分类----', inputParam);
        let classInfo = await this.ctx.model.Classification.findOne({
            where: inputParam,
            force: true,
            raw: true
        })
        // console.log('+++++',classInfo);
        if (classInfo) {
            this.ctx.throw(404, '已有该分类');
        }
        let classificationInfo = await this.ctx.model.Classification.create(inputParam);
        return classificationInfo;
    }

    /**
     * 查询所有分类
     */
    async findAllclassification(inputParam) {

        console.log('----查询所有分类---');
        if(!inputParam){
            let classificationInfo = await this.ctx.model.Classification.findAndCountAll({force: true,raw: true});
            return classificationInfo;
        }
        let { pageSize, pageNum, classificationName} = inputParam;
        console.log('++++++',classificationName);
        let classificationInfo 
        if(classificationName){
            classificationInfo = await this.ctx.model.Classification.findAndCountAll({
                where: {
                    classificationName: {
                        [Op.like]:'%' +classificationName + '%'
                    }
                    
                },
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                raw: true
            })
        }else{
            classificationInfo = await this.ctx.model.Classification.findAndCountAll({
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                raw: true
            })
        }
        
        return classificationInfo;
    }

    /**
     * 通过ID查分类
     * @param {*} classificationId 
     */
    async findOneById(classificationId){
        // console.log('---分类ID---', classificationId);
        let classInfo = await this.ctx.model.Classification.findOne({
            where: {
                id: classificationId
            },
            force: true,
            raw: true
        })
        return classInfo;
    }


    /**
     * 
     * @param {查找分类数量} inputParam 
     */
    async findCount() {
        let classInfo = await this.ctx.model.Classification.count({
            raw: true
        });
        console.log('-----', classInfo);
        return classInfo;
    }

    /**
     * 删除分类
     * @classificationId   分类主键ID
     */
    async deleteClassification(classificationId) {
        console.log('---删除分类---', classificationId);
        let classInfo = await this.ctx.model.Classification.findOne({
            where: {
                id: classificationId
            },
            force: true,
            raw: true
        })
        if (!classInfo) {
            this.ctx.throw(404, '没有该分类');
        }
        let classificationInfo = await this.ctx.model.Classification.destroy({
            where: {
                id: classificationId
            },
            force: true,
            raw: true
        });
        return classificationInfo;
    }
}

module.exports = Classification;