'use strict';
const util = require('../../libs/util');
const Controller = require('../core/base_controller');

module.exports = app => {
    let methodParm = {
        topLogo: {
            role: 'thumbsup',
            articleThumbsup: {
                param: {
                    userId: {
                        type: 'string'
                    },
                    articleId: {
                        type: 'string'
                    },

                },
                ginseng: {
                    msg: {
                        type: 'string'
                    },
                    data: {
                        status: {
                            type: 'boolean'
                        },
                        count: {
                            type: 'int'
                        },
                    },
                    status: {
                        type: 'int'
                    },
                    code: {
                        type: 'int'
                    },
                },
                rule: {
                    desc: '文章点赞接口',
                    url: '',
                    middwareMethod: '',
                    method: 'articleThumbsup'
                }
            },
            articleNothumbsup: {
                param: {
                    userId: {
                        type: 'string'
                    },
                    articleId: {
                        type: 'string'
                    },

                },
                ginseng: {
                    msg: {
                        type: 'string'
                    },
                    data: {
                        status: {
                            type: 'boolean'
                        },
                        count: {
                            type: 'int'
                        },
                    },
                    status: {
                        type: 'int'
                    },
                    code: {
                        type: 'int'
                    },
                },
                rule: {
                    desc: '文章取消点赞接口',
                    url: '',
                    middwareMethod: '',
                    method: 'articleNothumbsup'
                }
            }
        }
    }

    app.loadApiswagger(methodParm);

    class ThumbsupController extends Controller {

        //文章点赞及取消点赞
        async articleThumbsup() {
            this.paramsValidate(methodParm.topLogo.articleThumbsup.param);

            try {
                console.log('文章点赞入参:', this.params);
                let counts;
                let result;
                let data = await this.ctx.service.thumbsup.findThumbsups(this.params);
                let {
                    userId,
                    articleId
                } = this.params
                let inputPam = {
                    userId,
                    articleId
                }
                if (data === null || data.status === false) {
                    inputPam['status'] = true;
                    data = await this.ctx.service.thumbsup.insertThumbsup(inputPam);
                    counts = await this.ctx.service.article.articleThumbinsert(articleId);
                    if (counts[0] === 1) {
                        counts = await this.ctx.model.Article.findOne({
                            id: articleId
                        });
                    }
                    result = {
                        status: data.status,
                        count: counts.count
                    }
                    this.success('文章点赞成功', result)
                } else if (data.status === true) {   //若状态为true表示目前处于点赞状态，需要被取消点赞
                    let result = await this.ctx.service.thumbsup.removeThumbsup(this.params);
                    if(result === 1){
                        counts = await this.ctx.service.article.articleThumbdel(articleId);
                        if(counts[0] === 1){
                            counts = await this.ctx.model.Article.findOne({
                                id: articleId
                            });
                            result = {
                                status: false,
                                count: counts.count
                            }
                            this.success('文章取消点赞成功', result)
                        }
                        
                    }
                }
                
            } catch (error) {
                console.log('-----错误-----', error);
                this.ctx.logger.error('insertORdel error: ', error);
                this.fail('文章点赞或取消点赞失败');
            }
        }

        //文章取消点赞
        async articleNothumbsup() {
            this.paramsValidate(methodParm.topLogo.articleNothumbsup.param);

            try {
                console.log('文章取消点赞入参:', this.params);
                let {articleId} = this.params;
                let counts;
                let results;
                let data = await this.ctx.service.thumbsup.findThumbsups(this.params);
                if(data.status === true){
                    let result = await this.ctx.service.thumbsup.removeThumbsup(this.params);
                    if(result === 1){
                        counts = await this.ctx.service.article.articleThumbdel(articleId);
                        if(counts[0] === 1){
                            counts = await this.ctx.model.Article.findOne({
                                id: articleId
                            });
                            results = {
                                status: false,
                                count: counts.count
                            }
                            this.success('文章取消点赞成功', results)
                        }
                        
                    }
                }
            } catch (error) {
                console.log('-----错误-----', error);
                this.ctx.logger.error('delete error: ', error);
                this.fail('文章取消点赞失败');
            }
        }

        //评论内容点赞
        async commentThumbsup() {
            this.paramsValidate(methodParm.topLogo.commentThumbsup.param);

            try {

            } catch (error) {
                console.log('-----错误-----', error);
                this.ctx.logger.error('insert error: ', error);
                this.fail('评论点赞失败');
            }
        }

        //评论内容取消点赞
        async commentNothimbsup() {
            this.paramsValidate(methodParm.topLogo.commentNothimbsup.param);

            try {

            } catch (error) {
                console.log('-----错误-----', error);
                this.ctx.logger.error('delete error: ', error);
                this.fail('评论取消点赞失败');
            }
        }
    }
    return ThumbsupController;
}