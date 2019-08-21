'use strict';

const Service = require('egg').Service;
const {generateGuid_16} = require('../../libs/util')
class Comment extends Service {
    /**
     * 插入评论
     * @inputparm  评论内容
     */
    async insertComment(inputparm) {
        console.log('----增加分类----', inputparm);
        inputparm.id = generateGuid_16()
        let commentInfo = await this.ctx.model.Comment.create(inputparm);
        return commentInfo;
    }

    /**
     * 删除评论
     * @inputparm  评论参数
     */
    async removeComment(inputparm) {
        console.log('-----评论参数-----', inputparm);
        let {
            userId,
            articleId,
            commentId
        } = inputparm;
        let commentInfo = await this.ctx.model.Comment.destroy({
            where: {
                id: commentId,
                userId,
                articleId
            },
            force: true
        });
        return commentInfo;
    }

    /**
     * 查询评论
     */
    async findCommentByIds(inputparm) {
        console.log('----查询评论参数----', inputparm);
        let {
            userId,
            articleId
        } = inputparm;
        let commentInfo = await this.ctx.model.Comment.findAll({
            where: {
                userId,
                articleId
            },
            force: true
        });
        return commentInfo;
    }
}

module.exports = Comment;