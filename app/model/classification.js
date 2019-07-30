'use strict';

/**
 *
 * @param {分类表} classification
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

    const Admin = app.model.define('classification', {
        id: {
            type: INTEGER,
            field: 'id',
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        classificationId: {
            type: STRING, //分类ID
            unique: true //唯一
        },
        classificationName: STRING, //分类名

    }, {
        freezeTableName: true,// Model 对应的表名将与model名相同
        tableName: 'classification',
        timestamps: true,
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        paranoid: true
    });
    Admin.sync({ alert: true });

    return Admin;
};