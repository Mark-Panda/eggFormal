'use strict';
const util= require('../../libs/util');
const Controller = require('../core/base_controller');

module.exports = app => {
    let methodParm = {
        topLogo: {
            role: 'comment',
            insertComment: {
                param: {
                    userId: {type: 'string'},
                    articleId: {type: 'string'},
                    message: {type: 'string'},
                },
                ginseng: {
                    msg: {type: 'string'},
                    data: {
                        id: {type: 'int'},
                        userId: {type: 'string'},
                        articleId: {type: 'string'},
                        message: {type: 'string'},
                    },
                    status: {type: 'int'},
                    code: {type: 'int'},
                },
                rule: {
                    desc: '增加评论接口',
                    url: '',
                    middwareMethod:'',
                    method: 'insertComment'
                }
            },
            destryComment: {
                param: {
                    userId: {type: 'string'},
                    articleId: {type: 'string'},
                    commentId: {type: 'string'},
                },
                ginseng: {
                    msg: {type: 'string'},
                    data: {
                        id: {type: 'int'},
                        userId: {type: 'string'},
                        articleId: {type: 'string'},
                        message: {type: 'string'},
                    },
                    status: {type: 'int'},
                    code: {type: 'int'},
                },
                rule: {
                    desc: '删除评论接口',
                    url: '',
                    middwareMethod:'',
                    method: 'destryComment'
                }
            }
        }
    }
    app.loadApiswagger(methodParm);

    class CommentController extends Controller{

        //增加评论
        async insertComment(){
            this.paramsValidate(methodParm.topLogo.insertComment.param);
            try {
                console.log('增加评论入参:',this.params);
                let data = await this.ctx.service.comment.insertComment(this.params);
                this.success('插入评论成功', data)
            } catch (error) {
                console.log('-----错误-----',error);
                this.ctx.logger.error('insert error: ', error);
                this.fail('增加评论失败');
            }
        }

        //删除评论
        async destryComment(){
            this.paramsValidate(methodParm.topLogo.destryComment.param);
            try {
                console.log('删除评论入参:',this.params);
                
                let data = await this.ctx.service.comment.removeComment(this.params);
                this.success('插入评论成功', data)
            } catch (error) {
                console.log('-----错误-----',error);
                this.ctx.logger.error('insert error: ', error);
                this.fail('删除评论失败');
            }
        }
    }
    return CommentController;
}