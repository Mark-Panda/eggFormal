'use strict';

const Service = require('egg').Service;

class Comment extends Service{
    /**
     * 插入评论
     * @inputparm  评论内容
     */
    async insertComment(inputparm){
        console.log('----增加分类----',inputparm);
        let commentInfo = await this.ctx.model.Comment.create(inputparm);
        return commentInfo;
    }

    /**
     * 删除评论
     * @inputparm  评论参数
     */
    async removeComment(inputparm){
        console.log('-----评论参数-----',inputparm);
        let {userId, articleId, commentId} = inputparm;
        let commentInfo = await this.ctx.model.Comment.destroy({where:{id:commentId, userid: userId, articleId},force : true});
        return commentInfo;
    }

    /**
     * 
     */
}

module.exports = Comment;