'use strict';

const Service = require('egg').Service;

class Classification extends Service{
    /**
     * 增加分类
     */
    async createClassification(inputParam){
        console.log('----增加分类----',inputParam);
        let classInfo = await this.ctx.model.Classification.findOne({where:{classificationName:inputParam},force : true})
        if(classInfo){
            this.ctx.throw(404, '已有该分类');
        }
        let classificationInfo = await this.ctx.model.Classification.create(inputParam);
        return classificationInfo;
    }

    /**
     * 查询所有分类
     */
    async findAllclassification(){
        console.log('----查询所有分类---');
        let classificationInfo = await this.ctx.model.Classification.findAll();
        return classificationInfo;
    }

    /**
     * 删除分类
     * @classificationId   分类主键ID
     */
    async deleteClassification(classificationId){
        console.log('---删除分类---',classificationId);
        let classInfo = await this.ctx.model.Classification.findOne({where:{id:classificationId},force : true})
        if(!classInfo){
            this.ctx.throw(404, '没有该分类');
        }
        let classificationInfo = await this.ctx.model.Classification.destroy({where:{id:classificationId},force : true});
        return classificationInfo;
    }
}

module.exports = Classification;