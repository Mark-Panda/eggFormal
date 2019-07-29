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

    const Admin = app.model.define('comment', {
        id: {
            type: INTEGER,
            field: 'id',
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        commentId: {
            type: STRING, //评论ID
            unique: true //唯一
        },
        userid: STRING,
        articleId: STRING,
        message: TEXT,  //评论内容

    }, {
        freezeTableName: true,// Model 对应的表名将与model名相同
        tableName: 'comment',
        timestamps: true,
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        paranoid: true
    });
    Admin.sync({ alert: true });

    return Admin;
};
