'use strict';

/**
 *
 * @param {评论表} comment
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

    const Comment = app.model.define('comment', {
        id: {
            type: INTEGER,
            field: 'id',
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userId: STRING,
        articleId: STRING,
        message: TEXT, //评论内容

    }, {
        freezeTableName: true, // Model 对应的表名将与model名相同
        tableName: 'comment',
        timestamps: true,
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        paranoid: true
    });
    Comment.sync({
        alert: true
    });
    // Comment.prototype.associate = function() {
    //     app.model.Comment.hasMany(app.model.Thumbsup, { as: 'commentId' });  //外键关系
    // };
    return Comment;
};