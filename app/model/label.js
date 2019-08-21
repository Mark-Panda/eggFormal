'use strict';

/**
 *
 * @param {标签表} label
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

    const Label = app.model.define('label', {
        id: {
            type: STRING(100),
            field: 'id',
            unique: true,
            primaryKey: true,
            allowNull: false
        },
        labelName: {type:STRING.BINARY} , //标签名

    }, {
        freezeTableName: true, // Model 对应的表名将与model名相同
        tableName: 'label',
        timestamps: true,
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        paranoid: true
    });
    Label.sync({
        alert: true
    });

    return Label;
};