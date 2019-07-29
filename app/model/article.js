'use strict';

/**
 *
 * @param {文章表} article
 */
module.exports = app => {
    const {
        STRING,
        BOOLEAN,
        INTEGER,
        TEXT,
        FLOAT,
        DATE,
        UUID
    } = app.Sequelize;

    const Admin = app.model.define('article', {
        id: {
            type: INTEGER,
            field: 'id',
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        commentId: STRING,  //评论ID
        thumbsupId: STRING,  //点赞ID
        article: STRING, //文章名
        userid: STRING,  //用户ID
        classificationId: STRING, //分类ID
        message: TEXT, //文章内容
        author: STRING, //作者
        count: INTEGER,  //查询次数

    }, {
        freezeTableName: true,// Model 对应的表名将与model名相同
        tableName: 'article',
        timestamps: true,
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        paranoid: true
    });
    Admin.sync({ alert: true });

    return Admin;
};
