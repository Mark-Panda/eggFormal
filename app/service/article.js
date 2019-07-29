'use strict';

const Service = require('egg').Service;

class Article extends Service {
    /**
     * 查询文章
     * @inputParam  入参
     */
    async findArticle(inputParam){
        console.log('----查询文章input---',inputParam);
        let articleInfo = await this.ctx.model.Article.findAll(inputParam);
        return articleInfo
    }

    /**
     * 
     * @param {查询某一分类所有文章} inputParam 
     */
    async findAllarticle(inputParam,page,skip){
        console.log('----查询文章input---',inputParam,page,skip);
        let articleInfo = await this.ctx.model.Article.findAll({where: inputParam, limit: 1 * skip, offset: skip * (page - 1)});
        return articleInfo
    }

    /**
     * 录入文章
     * @inputParam  入参
     */
    async createArticle(inputParam){

    }

    /**
     * 通过ID查找文章
     * @articleId
     */
    async findArticleById(articleId){
        console.log('----查询文章---',articleId);
        let articleInfo = await this.ctx.model.Article.findOne(articleId);
        console.log('---- result ---',articleInfo);
        return articleInfo
    }

    /**
     * 删除文章
     * @articleId
     */
    async removeArticleById(articleId){

    }

    /**
     * 修改文章
     * @articleId
     */
    async updateArticleById(articleId){

    }
}

module.exports = Article;