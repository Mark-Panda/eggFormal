'use strict';

const Service = require('egg').Service;
const {generateGuid_16} = require('../../libs/util')
class Thumbsup extends Service {
    /**
     * 增加点赞
     * @inputparm  点赞状态true
     */
    async insertThumbsup(inputparm) {
        console.log('----点赞入参----', inputparm);
        inputparm.id = generateGuid_16()
        let commentInfo = await this.ctx.model.Thumbsup.create(inputparm);
        return commentInfo;
    }

    /**
     * 更新点赞数量
     * @param {} inputparm 
     */
    async updateThumbsup(inputparm) {
        console.log('更新入参',inputparm);
        let {userId, articleId, count} = inputparm
        // let articleInfo = await this.ctx.model.Thumbsup.findOne()
        const articleInfo = await this.ctx.model.Thumbsup.update({count},{where: {userId,articleId}});
        return articleInfo;
    }

    /**
     * 取消点赞
     * @inputparm  取消点赞参数
     */
    async removeThumbsup(inputparm) {
        console.log('-----评论参数-----', inputparm);
        let {
            userId,
            articleId,
        } = inputparm;
        let thumbsupInfo = await this.ctx.model.Thumbsup.destroy({
            where: {
                userId,
                articleId
            },
            force: true
        });
        return thumbsupInfo;
    }

    /**
     * 查询点赞数量
     */
    async findThumbsups(inputparm) {
        console.log('----查询评论参数----', inputparm);
        let {
            userId,
            articleId,
            commentId
        } = inputparm;
        let commentInfo;
        if (commentId) {
            commentInfo = await this.ctx.model.Thumbsup.findOne({
                where: {
                    userId,
                    articleId,
                    commentId
                },
                force: true,
                raw: true
            });
        } else {
            commentInfo = await this.ctx.model.Thumbsup.findOne({
                where: {
                    userId,
                    articleId
                },
                force: true,
                raw: true
            });
        }

        return commentInfo;
    }
}

module.exports = Thumbsup;