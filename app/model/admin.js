'use strict';

/**
 *
 * @param {管理员表} app
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

    const Admin = app.model.define('admin', {
        id: {
            type: STRING(100),
            field: 'id',
            unique: true,
            primaryKey: true,
            allowNull: false
        },
        roleid: STRING, //角色 ID
        userid: {
            type: STRING, //用户ID
            unique: true //唯一
        },
        userName: STRING, //用户名
        phone: STRING, //手机号
        password: STRING, //密码
        realName: STRING, //昵称
        isLocked: BOOLEAN, //是否锁定  0 锁定  1 正常
        mechanismId: STRING, //二级机构ID
        //last_sign_in_at: DATE, //最后登录时间

    }, {
        freezeTableName: true, // Model 对应的表名将与model名相同
        tableName: 'admin',
        timestamps: true,
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        paranoid: true
    });
    Admin.sync({
        alert: true
    });

    return Admin;
};