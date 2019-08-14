'use strict';

const Service = require('egg').Service;

class Article extends Service {
    /**
     * 查询文章
     * @inputParam  入参
     */
    async findArticle(inputParam) {
        console.log('----查询文章input---', inputParam);
        let articleInfo = await this.ctx.model.Article.findAll(inputParam);
        // let articleInfo = await this.ctx.model.Article.findAll(inputParam);
        return articleInfo;
    }

    /**
     * 
     * @param {查询某一分类所有文章} inputParam 
     */
    async findAllarticle(inputParam, page, skip) {
        console.log('----查询文章input---', inputParam, page, skip);
        let articleInfo = await this.ctx.model.Article.findAll({
            where: inputParam,
            limit: 1 * skip,
            offset: skip * (page - 1)
        });
        return articleInfo;
    }

    /**
     * 
     * @param {查找文章数量} inputParam 
     */
    async findCount(inputParam) {
        console.log('----查询input---', inputParam);
        let articleInfo = await this.ctx.model.Article.count({
            where: inputParam
        });
        console.log('-----', articleInfo);
        return articleInfo;
    }

    /**
     * 查找文章数量和信息
     * @param {分类ID} inputParam 
     * @page  {分页}   page
     * @skip  {切片}   skip
     */
    async findCountBy(inputParam, page, skip) {
        console.log('----查询数量input----', inputParam);
        let articleInfo
        if (!inputParam) {
            articleInfo = await this.ctx.model.Article.findAndCountAll()
        } else {
            if (!page || !skip) {
                articleInfo = await this.ctx.model.Article.findAndCountAll({
                    where: {
                        classificationId: inputParam
                    }
                })
            } else {
                articleInfo = await this.ctx.model.Article.findAndCountAll({
                    where: {
                        classificationId: inputParam
                    },
                    limit: 1 * skip,
                    offset: skip * (page - 1)
                })
            }
        }
        // console.log('-----result----',articleInfo);
        return articleInfo;
    }


    /**
     * 录入文章
     * @inputParam  入参
     */
    async createArticle(inputParam) {
        console.log('---录入文章input---', inputParam);
        let resultTag;
        let resultTags;
        if(Array.isArray(inputParam.tags)){
            resultTag = inputParam.tags.toString()
        }
        if(Array.isArray(inputParam.classificationId)){
            resultTags = inputParam.classificationId.toString()
        }
        inputParam.tags = resultTag
        inputParam.classificationId = resultTags
        console.log('---- 文章录入11111 ----', inputParam);
        let data = await this.ctx.model.Article.create(inputParam);
        return data;
    }

    /**
     * 通过ID查找文章
     * @articleId
     */
    async findArticleById(articleId) {
        console.log('----查询文章---', articleId);
        let articleInfo = await this.ctx.model.Article.findOne(articleId);
        return articleInfo;
    }

    /**
     * 删除文章
     * @articleId
     */
    async removeArticleById(articleId) {
        console.log('---文章ID--', articleId);
        const articleInfo = await this.ctx.model.Article.destroy({
            where: {
                id: articleId
            },
            force: true
        });
        console.log('---是否删除成功---', articleInfo);
        return articleInfo;
    }

    /**
     * 修改文章
     * @articleId  文章ID
     * @inputParam  修改内容
     */
    async updateArticleById(articleId, inputParam) {
        const articleInfo = await this.ctx.model.Article.findOne({
            id: articleId
        });
        if (!articleInfo) {
            this.ctx.throw(404, '没有该文章');
        }
        return articleInfo.update(inputParam);
    }

    /**
     * 文章点赞数增加
     */
    async articleThumbinsert(articleId) {
        const articleInfo = await this.ctx.model.Article.findOne({
            id: articleId
        });
        if (!articleInfo) {
            this.ctx.throw(404, '没有该文章');
        }
        articleInfo.dataValues.count += 1;
        let result = await this.ctx.model.Article.update(articleInfo.dataValues,{where:{id: articleId}});
        return result;
    }

    /**
     * 文章点赞数减少
     */
    async articleThumbdel(articleId){
        const articleInfo = await this.ctx.model.Article.findOne({
            id: articleId
        });
        if (!articleInfo) {
            this.ctx.throw(404, '没有该文章');
        }
        let result = 0;
        if(articleInfo.dataValues.count > 0){
            articleInfo.dataValues.count -= 1;
            result = await this.ctx.model.Article.update(articleInfo.dataValues,{where:{id: articleId}});
        }
        
        
        return result;
    }
}

module.exports = Article;