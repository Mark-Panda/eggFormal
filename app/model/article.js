'use strict';

/**
 *
 * @param {文章表} article
 */
module.exports = app => {
    const { STRING, BOOLEAN, INTEGER, TEXT, FLOAT, DATE, UUID } = app.Sequelize;

    const Article = app.model.define('article', {
        id: {
            type: STRING(100),
            field: 'id',
            unique: true,
            primaryKey: true,
            allowNull: false
        },
        title: STRING, //标题
        content: TEXT, //文章内容
        author: STRING, //作者
        tags: STRING, //标签
        img_url: STRING, //封面链接（后台上传一个链接，前端根据这个地址展示文章的封面）
        origin: STRING, //创作模式   0 原创，1 转载，2 混合
        state: STRING, //文章发布状态 => 0 草稿，1 已发布
        type: STRING, // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
        classificationId: STRING, //分类ID
        count: INTEGER, //点赞次数
        viewCounts: INTEGER, //浏览次数
        commentId: STRING, //评论ID
        thumbsupId: STRING, //点赞ID
        userid: STRING, //用户ID
    }, {
        freezeTableName: true, // Model 对应的表名将与model名相同
        tableName: 'article',
        timestamps: true,
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        paranoid: true
    });
    Article.sync({
        alert: true
    });  
    // Article.prototype.associate = function() {
    //     app.model.Article.hasMany(app.model.Comment, { as: 'articleId' });  //外键关系
    //     app.model.Article.hasMany(app.model.Thumbsup, { as: 'articleId' });  //外键关系
    // };
    return Article;
};