'use strict';
const util = require('../../libs/util');
const Controller = require('../core/base_controller');

module.exports = app => {
    let methodParm = {
        topLogo: {
            role: 'article',
            findArticle: {
                param: {
                    title: {
                        type: 'string'
                    },
                    classificationId: {
                        type: 'string'
                    },
                    author: {
                        type: 'string',
                        optional: true
                    },
                },
                ginseng: {
                    msg: {
                        type: 'string'
                    },
                    data: {
                        article: {
                            type: 'string'
                        },
                        classificationId: {
                            type: 'string'
                        },
                        message: {
                            type: 'string'
                        },
                        author: {
                            type: 'string'
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
                    desc: '查询',
                    url: '',
                    middwareMethod: '',
                    method: 'findArticle'
                }
            },
            findArticleByclass: {
                param: {
                    classificationId: {
                        type: 'string'
                    },
                    page: {
                        type: 'string',
                        optional: true
                    },
                    skip: {
                        type: 'string',
                        optional: true
                    },
                },
                ginseng: {
                    msg: {
                        type: 'string'
                    },
                    data: {
                        article: {
                            type: 'string'
                        },
                        classificationId: {
                            type: 'string'
                        },
                        message: {
                            type: 'string'
                        },
                        author: {
                            type: 'string'
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
                    desc: '按分类查询文章',
                    url: '',
                    middwareMethod: '',
                    method: 'findArticleByclass'
                }
            },
            createArticle: {
                param: {
                    classificationId: {
                        type: 'any'
                    },
                    content: {
                        type: 'string'
                    },
                    author: {
                        type: 'string'
                    },
                    title: {
                        type: 'string'
                    },
                    tags: {
                        type: 'any',
                        optional: true
                    },
                    img_url: {
                        type: 'string',
                        optional: true
                    },
                    origin: {
                        type: 'string'
                    },
                    state: {
                        type: 'string'
                    },
                    type: {
                        type: 'string'
                    }
                },
                ginseng: {
                    msg: {
                        type: 'string'
                    },
                    data: {
                        id: {
                            type: 'int'
                        },
                        classificationId: {
                            type: 'string'
                        },
                        article: {
                            type: 'string'
                        },
                        message: {
                            type: 'string'
                        },
                        author: {
                            type: 'string'
                        },
                        updatedAt: {
                            type: 'string'
                        },
                        createdAt: {
                            type: 'string'
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
                    desc: '文章录入',
                    url: '',
                    middwareMethod: '',
                    method: 'createArticle'
                }
            },
            updateArticle: {
                param: {
                    articleId: {
                        type: 'string'
                    },
                    classificationId: {
                        type: 'string',
                        optional: true
                    },
                    message: {
                        type: 'string',
                        optional: true
                    },
                    author: {
                        type: 'string',
                        optional: true
                    },
                },
                ginseng: {
                    msg: {
                        type: 'string'
                    },
                    data: {
                        id: {
                            type: 'int'
                        },
                        commentId: {
                            type: 'string'
                        },
                        thumbsupId: {
                            type: 'string'
                        },
                        article: {
                            type: 'string'
                        },
                        userid: {
                            type: 'string'
                        },
                        classificationId: {
                            type: 'string'
                        },
                        message: {
                            type: 'string'
                        },
                        author: {
                            type: 'string'
                        },
                        count: {
                            type: 'string'
                        },
                        createdAt: {
                            type: 'string'
                        },
                        updatedAt: {
                            type: 'string'
                        },
                        deletedAt: {
                            type: 'string'
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
                    desc: '修改文章内容',
                    url: '',
                    middwareMethod: '',
                    method: 'updateArticle'
                }
            },
            findArticleCount: {
                param: {
                    classificationId: {
                        type: 'string',
                        optional: true
                    },
                    page: {
                        type: 'string',
                        optional: true
                    },
                    skip: {
                        type: 'string',
                        optional: true
                    },
                },
                ginseng: {
                    msg: {
                        type: 'string'
                    },
                    data: {
                        count: {
                            type: 'int'
                        },
                        rows: [{
                            id: {
                                type: 'int'
                            },
                            commentId: {
                                type: 'string'
                            },
                            thumbsupId: {
                                type: 'string'
                            },
                            article: {
                                type: 'string'
                            },
                            userid: {
                                type: 'string'
                            },
                            classificationId: {
                                type: 'string'
                            },
                            message: {
                                type: 'string'
                            },
                            author: {
                                type: 'string'
                            },
                            count: {
                                type: 'string'
                            },
                            createdAt: {
                                type: 'string'
                            },
                            updatedAt: {
                                type: 'string'
                            },
                            deletedAt: {
                                type: 'string'
                            },
                        }]
                    },
                    status: {
                        type: 'int'
                    },
                    code: {
                        type: 'int'
                    },
                },
                rule: {
                    desc: '查找文章数量',
                    url: '',
                    middwareMethod: '',
                    method: 'findArticleCount'
                }
            },
            destroyArticle: {
                param: {
                    articleId: {
                        type: 'string'
                    }
                },
                ginseng: {
                    msg: {
                        type: 'string'
                    },
                    data: {
                        type: 'int'
                    },
                    status: {
                        type: 'int'
                    },
                    code: {
                        type: 'int'
                    },
                },
                rule: {
                    desc: '删除文章',
                    url: '',
                    middwareMethod: '',
                    method: 'destroyArticle'
                }
            }
        }
    }

    app.loadApiswagger(methodParm);
    class ArticleController extends Controller {

        /**
         * 查询
         */
        async findArticle() {
            this.paramsValidate(methodParm.topLogo.findArticle.param); //状态码  201 参数错误
            try {
                console.log('---- 查询文章 ----', this.params);

                // let { article, classificationId,author } = this.params;

                let findJson = {
                    where: {
                        ...this.params
                    }
                }
                let result = []
                const articleInfo = await this.ctx.service.article.findArticle(findJson);
                // console.log('----文章消息----',articleInfo);
                if (articleInfo instanceof Array) {
                    for (let item of articleInfo) {
                        result.push(item);
                    }
                } else {
                    articleInfo = [articleInfo]
                    for (let item of articleInfo) {
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
         * 查询文章总数量并返回每个文章信息
         */

        async findArticleCount() {
            this.paramsValidate(methodParm.topLogo.findArticleCount.param);
            try {
                console.log('--- 查询文章数量 ---', this.params);
                let {
                    classificationId,
                    page,
                    skip
                } = this.params
                let findJson = {
                    classificationId
                }
                const articleCount = await this.ctx.service.article.findCountBy(classificationId, page, skip);
                console.log('---- server接受结果 ---', articleCount);
                this.success('查询成功', articleCount)
            } catch (error) {
                console.log(error);
                this.ctx.logger.error('find error: ', error);
                this.fail('查询失败')
            }
        }

        /**
         * 查询某一分类所有文章,分页
         */
        async findArticleByclass() {
            this.paramsValidate(methodParm.topLogo.findArticleByclass.param); //状态码  201 参数错误
            try {
                console.log('---- 查询文章param----', this.params);

                let {
                    page,
                    classificationId,
                    skip
                } = this.params;

                let findJson = {
                    classificationId
                }
                let result = []
                const articleInfo = await this.ctx.service.article.findAllarticle(findJson, page, skip);
                if (articleInfo instanceof Array) {
                    for (let item of articleInfo) {
                        result.push(item);
                    }
                } else {
                    articleInfo = [articleInfo]
                    for (let item of articleInfo) {
                        result.push(item);
                    }
                }
                console.log('----最终结果---', result);
                this.success('查询成功', result)

            } catch (error) {
                console.log(error);
                this.ctx.logger.error('find error: ', error);
                this.fail('查询失败')
            }
        }

        /**
         * 文章录入
         * 
         */
        async createArticle() {
            
            this.paramsValidate(methodParm.topLogo.createArticle.param)
            try {
                console.log('---- 文章录入 ----', this.params);   
                const articleInfo = await this.ctx.service.article.createArticle(this.params);
                this.success('文章录入成功', articleInfo.dataValues)
            } catch (error) {
                console.log(error);
                this.ctx.logger.error('create error: ', error);
                this.fail('文章录入失败')
            }
        }

        /**
         * 修改文章
         */
        async updateArticle() {
            this.paramsValidate(methodParm.topLogo.updateArticle.param)
            try {
                console.log('---- 修改文章所需信息 ----', this.params);
                let {
                    articleId,
                    classificationId,
                    message,
                    author
                } = this.params;
                let updateInfo = {
                    classificationId,
                    message,
                    author
                }
                const updateArticleInfo = await this.ctx.service.article.updateArticleById(articleId, updateInfo);

                this.success('查询成功', updateArticleInfo.dataValues)

            } catch (error) {
                console.log(error);
                this.ctx.logger.error('update error: ', error);
                this.fail('修改文章失败')
            }
        }

        /**
         * 删除文章
         */
        async destroyArticle() {
            this.paramsValidate(methodParm.topLogo.destroyArticle.param)
            try {
                console.log('---- 删除文章ID ----', this.params);
                let {
                    articleId
                } = this.params
                const destroyInfo = await this.ctx.service.article.removeArticleById(articleId);

                this.success('删除成功', destroyInfo)
            } catch (error) {
                console.log(error);
                this.ctx.logger.error('destroy error: ', error);
                this.fail('删除文章失败')
            }
        }
    }
    return ArticleController
}