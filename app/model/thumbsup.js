'use strict';

/**
 *
 * @param {点赞表} thumbsup
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

    const Admin = app.model.define('thumbsup', {
        id: {
            type: INTEGER,
            field: 'id',
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        commentId: STRING,
        userId: STRING,
        articleId: STRING,
        status: BOOLEAN,

    }, {
        freezeTableName: true, // Model 对应的表名将与model名相同
        tableName: 'thumbsup',
        timestamps: true,
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        paranoid: true
    });
    Admin.sync({
        alert: true
    });

    return Admin;
};