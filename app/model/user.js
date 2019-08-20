'use strict';

/**
 *
 * @param {用户表} app
 */
module.exports = app => {
    const { STRING, BOOLEAN, INTEGER, TEXT, FLOAT, DATE, UUID } = app.Sequelize;

    const User = app.model.define('user', {
        id: {
            type: INTEGER,
            field: 'id',
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userid: {
            type: STRING, //用户ID
            unique: true //唯一
        },
        email: STRING, //邮箱
        userName: STRING, //用户名
        phone: STRING, //手机号
        password: STRING, //密码
        introduce: STRING,
        type: BOOLEAN, //角色 ID  用户设为1  管理员设置为2

    }, {
        freezeTableName: true, // Model 对应的表名将与model名相同
        tableName: 'user',
        timestamps: true,
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        paranoid: true
    });
    User.sync({
        alert: true
    });
    // User.prototype.associate = function() {
    //     app.model.User.hasMany(app.model.Article, { as: 'userid' });  //外键关系
    //     app.model.User.hasMany(app.model.Comment, { as: 'userId' });  //外键关系
    //     app.model.User.hasMany(app.model.Thumbsup, { as: 'userId' });  //外键关系
    // };

    return User;
};