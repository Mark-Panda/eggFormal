'use strict';

const Service = require('egg').Service;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {generateGuid_16} = require('../../libs/util')
class Projects extends Service {
    /**
     * 增加项目
     */
    async createProject(inputParam) {
        console.log('----增加项目----', inputParam);
        let projectsInfo = await this.ctx.model.Projects.findOne({
            where: {
                projectUrl: inputParam.projectUrl
            },
            force: true,
            raw: true
        })
        console.log('+++++',projectsInfo);
        if (projectsInfo) {
            this.ctx.throw(404, '已有该项目');
        }
        inputParam.id = generateGuid_16()
        let projectInfo = await this.ctx.model.Projects.create(inputParam);
        return projectInfo;
    }

    /**
     * 查询所有项目  分页 | 无分页
     */
    async findAllProject(inputParam) {
        console.log('----查询所有项目---',inputParam);
        if(!inputParam){
            let projectInfo = await this.ctx.model.Projects.findAndCountAll({force: true,raw: true});
            return projectInfo;
        }
        let { pageSize, pageNum, title, status} = inputParam;
        let projectsInfo;
        if (!title && !status){
            projectsInfo = await this.ctx.model.Projects.findAndCountAll({
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                raw: true
            })
        }
        if(title && !status){
            projectsInfo = await this.ctx.model.Projects.findAndCountAll({
                where: {
                    title: {
                        [Op.like]:'%' +title + '%'
                    }
                },
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                raw: true
            })
        }else if (!title && status){
            projectsInfo = await this.ctx.model.Projects.findAndCountAll({
                where: {
                    status
                },
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                raw: true
            })
        }else if(title && status){
            projectsInfo = await this.ctx.model.Projects.findAndCountAll({
                where: {
                    title: {
                        [Op.like]:'%' +linkName + '%'
                    },
                    status
                },
                limit: 1 * pageSize,
                offset: pageSize * (pageNum - 1),
                raw: true
            })
        }
        console.log('--- 项目 ---',projectsInfo);
        return projectsInfo;
    }

    /**
     * 
     * @param {查找项目数量} inputParam 
     */
    async findCount() {
        let projectInfo = await this.ctx.model.Projects.count({
            raw: true
        });
        console.log('-----', projectInfo);
        return projectInfo;
    }

    /**
     * 通过ID查项目
     * @param {*} projectId 
     */
    async findOneById(projectId){
        let projectInfo = await this.ctx.model.Projects.findOne({
            where: {
                id: projectId
            },
            force: true,
            raw: true
        })
        return projectInfo;
    }

    /**
     * 删除项目
     * @projectId   项目主键ID
     */
    async deleteProject(projectId) {
        console.log('---删除项目---', projectId);
        let projectInfo = await this.ctx.model.Projects.findOne({
            where: {
                id: projectId
            },
            force: true,
            raw: true
        })
        if (!projectInfo) {
            this.ctx.throw(404, '没有该链接');
        }
        let projectsInfo = await this.ctx.model.Projects.destroy({
            where: {
                id: projectId
            },
            force: true,
            raw: true
        });
        return projectsInfo;
    }
}

module.exports = Projects;