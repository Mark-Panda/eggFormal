'use strict';

/**
 *
 * @param {项目表} projects
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

    const Projects = app.model.define('projects', {
        id: {
            type: STRING(100),
            field: 'id',
            unique: true,
            primaryKey: true,
            allowNull: false
        },
        title: STRING , //项目名称
        content: STRING , //项目内容
        projectUrl: STRING,     //项目链接
        imageUrl: STRING,    //封面图片链接
        status: STRING    //项目状态
    }, {
        freezeTableName: true, // Model 对应的表名将与model名相同
        tableName: 'projects',
        timestamps: true,
        // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        paranoid: true
    });
    Projects.sync({
        alert: true
    });

    return Projects;
};