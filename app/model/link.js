'use strict';

/**
 *
 * @param {链接表} link
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

    const Link = app.model.define('link', {
        id: {
            type: INTEGER,
            field: 'id',
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        linkName: STRING , //链接名
        linkAddress: STRING , //链接地址
        linkType: STRING,     //链接类型
        desc: STRING,    //描述
        icro: STRING    //图标
    }, {
        freezeTableName: true, // Model 对应的表名将与model名相同
        tableName: 'link',
        timestamps: true,
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        paranoid: true
    });
    Link.sync({
        alert: true
    });

    return Link;
};