'use strict';
const util= require('../../libs/util');
const Controller = require('../core/base_controller');

module.exports = app => {
    let methodParm = {
        topLogo:{
            role: 'article',
            findArticle: {
                param: {
                    article: {type: 'string'},
                    classificationId: {type: 'string'},
                    author: {type: 'string',optional: true},
                },
                ginseng: {
                    msg: {type: 'string'},
                    data: {
                        article: {type: 'string'},
                    classificationId: {type: 'string'},
                    message: {type: 'string'},
                    author: {type: 'string'},
                    },
                    status: {type: 'int'},
                    code: {type: 'int'},
                },
                rule: {
                    desc: '查询',
                    url: '',
                    method: 'findArticle'
                }
            },
            findArticleByclass: {
                param: {
                    classificationId: {type: 'string'},
                    page: {type: 'string',optional: true},
                    skip: {type: 'string',optional: true},
                },
                ginseng: {
                    msg: {type: 'string'},
                    data: {
                        article: {type: 'string'},
                        classificationId: {type: 'string'},
                        message: {type: 'string'},
                        author: {type: 'string'},
                    },
                    status: {type: 'int'},
                    code: {type: 'int'},
                },
                rule: {
                    desc: '查询',
                    url: '',
                    method: 'findArticleByclass'
                }
            }
        }
    }

    app.loadApiswagger(methodParm);
    class ArticleController extends Controller{

        /**
         * 查询
         */
        async findArticle(){
            this.paramsValidate(methodParm.topLogo.findArticle.param); //状态码  201 参数错误
            try {
                console.log('---- 查询文章 ----',this.params);

                // let { article, classificationId,author } = this.params;
        
                let findJson = {
                    where: {
                        ...this.params
                    }
                }
                let result = []
                const articleInfo = await this.ctx.service.article.findArticle(findJson);
                // console.log('----文章消息----',articleInfo);
                if(articleInfo instanceof Array){
                    for(let item of articleInfo){
                        result.push(item);
                    }
                }else{
                    articleInfo = [articleInfo]
                    for(let item of articleInfo){
                        result.push(item);
                    }
                }
                this.success('查询成功', result)

            } catch (error) {
                console.log(error);
                this.ctx.logger.error('find error: ', error);
                this.fail('查询失败')
            }
        }

        /**
         * 查询某一分类所有文章,分页
         */
        async findArticleByclass(){
            this.paramsValidate(methodParm.topLogo.findArticleByclass.param); //状态码  201 参数错误
            try {
                console.log('---- 查询文章param----',this.params);

                let { page, classificationId, skip } = this.params;
        
                let findJson = {
                    classificationId
                }
                let result = []
                const articleInfo = await this.ctx.service.article.findAllarticle(findJson,page,skip);
                if(articleInfo instanceof Array){
                    for(let item of articleInfo){
                        result.push(item);
                    }
                }else{
                    articleInfo = [articleInfo]
                    for(let item of articleInfo){
                        result.push(item);
                    }
                }
                console.log('----最终结果---',result);
                this.success('查询成功', result)

            } catch (error) {
                console.log(error);
                this.ctx.logger.error('find error: ', error);
                this.fail('查询失败')
            }
        }
    }
    return ArticleController
}