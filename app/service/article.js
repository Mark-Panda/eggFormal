'use strict';

const Service = require('egg').Service;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {generateGuid_16} = require('../../libs/util')

class Article extends Service {
    /**
     * 查询文章
     * @inputParam  入参
     */
    async findArticle(inputParam) {
        console.log('----查询文章inputserver---', inputParam);
        // let articleInfo = await this.ctx.model.Article.findAll(inputParam);
        let { pageSize, pageNum, tags } = inputParam;
        let articleInfo;
        if(tags){
            if(Array.isArray(tags)) tags = tags.toString()
            let labelId = await this.ctx.model.Label.findOne({
                where: {
                    labelName: tags
                },
                raw: true
            })
            console.log('------',labelId);
            articleInfo = await this.ctx.model.Article.findAndCountAll({
                where:{
                    tags:{
                        [Op.like]:'%' +labelId.id + '%'
                    }
                },
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                order: Sequelize.literal('createdAt DESC'),
                raw: true
            })
            // console.log('======article====',articleInfo);
        }else{
            articleInfo = await this.ctx.model.Article.findAndCountAll({
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                order: Sequelize.literal('createdAt DESC'),
                raw: true
            });
            // console.log('======article====',articleInfo);
        }
        
        return articleInfo;
    }

    /**
     * 
     * 首页查询文章
     */
    async headerFindArticle(inputParam) {
        console.log('----首页查询文章inputserver---', inputParam);
        let { pageSize, pageNum, likes, tag_id, category_id } = inputParam;
        let articleInfo;
        if(!likes && !tag_id && !category_id){
            articleInfo = await this.ctx.model.Article.findAndCountAll({
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                order: Sequelize.literal('createdAt DESC'),
                raw: true
            });
            console.log('---- articleInfo ---',articleInfo);
            for(let item of articleInfo.rows){
                item['commectCount'] = await this.ctx.model.Comment.count({
                    where:{
                        articleId:item.id
                    },
                    raw: true
                })
                item['thumbsupCount'] = await this.ctx.model.Thumbsup.count({
                    where:{
                        articleId:item.id
                    },
                    raw: true
                })
            }
        }else if(likes){
            articleInfo = await this.ctx.model.Article.findAndCountAll({
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                order: [Sequelize.literal('createdAt DESC'),Sequelize.literal('viewCounts DESC')],
                raw: true
            });
            for(let item of articleInfo.rows){
                item['commectCount'] = await this.ctx.model.Comment.count({
                    where:{
                        articleId:item.id
                    },
                    raw: true
                })
                item['thumbsupCount'] = await this.ctx.model.Thumbsup.count({
                    where:{
                        articleId:item.id
                    },
                    raw: true
                })
            }
        }else if(tag_id){
            articleInfo = await this.ctx.model.Article.findAndCountAll({
                where:{
                    tags:{
                        [Op.like]:'%' + tag_id + '%'
                    }
                },
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                order: Sequelize.literal('createdAt DESC'),
                raw: true
            });
            for(let item of articleInfo.rows){
                item['commectCount'] = await this.ctx.model.Comment.count({
                    where:{
                        articleId:item.id
                    },
                    raw: true
                })
                item['thumbsupCount'] = await this.ctx.model.Thumbsup.count({
                    where:{
                        articleId:item.id
                    },
                    raw: true
                })
            }
        }else if(category_id){
            articleInfo = await this.ctx.model.Article.findAndCountAll({
                where:{
                    classificationId:{
                        [Op.like]:'%' + category_id + '%'
                    }
                },
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                order: Sequelize.literal('createdAt DESC'),
                raw: true
            });
            for(let item of articleInfo.rows){
                item['commectCount'] = await this.ctx.model.Comment.count({
                    where:{
                        articleId:item.id
                    },
                    raw: true
                })
                item['thumbsupCount'] = await this.ctx.model.Thumbsup.count({
                    where:{
                        articleId:item.id
                    },
                    raw: true
                })
            }
        }
        return articleInfo;
    }

    /**
     * 
     * @param {查询某一分类所有文章} inputParam 
     */
    async findAllarticle(inputParam, page, skip) {
        console.log('----查询文章input---', inputParam, page, skip);
        let articleInfo = await this.ctx.model.Article.findAndCountAll({
            where: inputParam,
            limit: 1 * skip,
            offset: skip * (page - 1),
            raw: true
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
            where: inputParam,
            raw: true
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
                    },
                    raw: true
                })
            } else {
                articleInfo = await this.ctx.model.Article.findAndCountAll({
                    where: {
                        classificationId: inputParam
                    },
                    limit: 1 * skip,
                    offset: skip * (page - 1),
                    raw: true
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
        inputParam.id = generateGuid_16()
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
        let articleInfo = await this.ctx.model.Article.findOne({
            where: {
                id: articleId.articleId
            },
            force: true,
            raw: true
        });
        articleInfo['commectCount'] = await this.ctx.model.Comment.count({
            where:{
                articleId:articleId
            },
            raw: true
        })
        articleInfo['thumbsupCount'] = await this.ctx.model.Thumbsup.count({
            where:{
                articleId:articleId
            },
            raw: true
        })
        console.log('---- 文章详情 ----', articleInfo);
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
            force: true,
            raw: true
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
            id: articleId,
            raw: true
        });
        console.log('文章',articleInfo);
        if (!articleInfo) {
            this.ctx.throw(404, '没有该文章');
        }
        console.log('---修改内容---',inputParam);
        
        if(Array.isArray(inputParam.classificationId)) inputParam.classificationId = inputParam.classificationId.toString()
        if(Array.isArray(inputParam.tags)) inputParam.tags = inputParam.tags.toString()
        
        return this.ctx.model.Article.update(inputParam,{where:{id: articleId}});
    }

    /**
     * 文章点赞数增加
     */
    async articleThumbinsert(articleId) {
        const articleInfo = await this.ctx.model.Article.findOne({
            id: articleId,
            raw: true
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
            id: articleId,
            raw: true
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