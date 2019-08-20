'use strict';

/**
 *
 * @param {评论与文章外键关系表表} comHasArt
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

    const ComHasArt = app.model.define('comHasArt', {
        id: {
            type: INTEGER,
            field: 'id',
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        commentId: STRING,  //评论ID
        articleId: STRING,  //文章ID

    }, {
        freezeTableName: true, // Model 对应的表名将与model名相同
        tableName: 'comHasArt',
        timestamps: true,
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        paranoid: true
    });
    ComHasArt.sync({
        alert: true
    });
    return ComHasArt;
};