'use strict';
const util = require('../../libs/util');
const Controller = require('../core/base_controller');


module.exports = app => {
    let methodParm = {
        topLogo: {
            role: 'projects',
            findAllProject: {
                param: {
                    pageSize: {
                        type: 'any',
                        optional: true
                    },
                    pageNum: {
                        type: 'any',
                        optional: true
                    },
                    title: {
                        type: 'any',
                        optional: true
                    },
                    status: {
                        type: 'any',
                        optional: true
                    }
                },
                ginseng: {
                    msg: {
                        type: 'string'
                    },
                    data: {
                        type: 'int'
                    },
                    status: {
                        type: 'int'
                    },
                    code: {
                        type: 'int'
                    },
                },
                rule: {
                    desc: '查找所有项目',
                    url: '',
                    middwareMethod: '',
                    method: 'findAllProject'
                }
            },
            deleteProjectById: {
                param: {
                    projectId: {
                        type: 'any'
                    },
                },
                ginseng: {
                    msg: {
                        type: 'string'
                    },
                    data: {
                        type: 'int'
                    },
                    status: {
                        type: 'int'
                    },
                    code: {
                        type: 'int'
                    },
                },
                rule: {
                    desc: '通过ID删除项目',
                    url: '',
                    middwareMethod: '',
                    method: 'deleteProjectById'
                }
            },
            insertProject: {
                param: {
                    title: {
                        type: 'string'
                    },
                    content: {
                        type: 'string'
                    },
                    projectUrl: {
                        type: 'string'
                    },
                    imageUrl: {
                        type: 'string',
                        optional: true
                    },
                    status: {
                        type: 'string'
                    }
                },
                ginseng: {
                    msg: {
                        type: 'string'
                    },
                    data: {
                        type: 'int'
                    },
                    status: {
                        type: 'int'
                    },
                    code: {
                        type: 'int'
                    },
                },
                rule: {
                    desc: '增加项目',
                    url: '',
                    middwareMethod: '',
                    method: 'insertProject'
                }
            }
        }
    }
    app.loadApiswagger(methodParm);

    class ProjectController extends Controller {
        async findAllProject() {
            
            try {
                this.paramsValidate(methodParm.topLogo.findAllProject.param);
                console.log('---- 查询项目 ----', this.params);
                const projectsInfo = await this.ctx.service.projects.findAllProject(this.params);
                console.log('----- 结果 ---',projectsInfo);
                let result = {
                    count: projectsInfo.count,
                    projectsInfo:projectsInfo.rows
                }
                console.log('----result----',result);
                this.success('查询成功', result)
            } catch (error) {
                console.log(error);
                this.ctx.logger.error('find error: ', error);
                this.fail('查询失败'+error)
            }
        }

        async deleteProjectById() {
            
            try {
                this.paramsValidate(methodParm.topLogo.deleteProjectById.param);
                console.log('---- 项目ID ----', this.params);
                let {
                    projectId
                } = this.params;
                let projectsInfo = await this.ctx.service.projects.deleteProject(projectId);
                this.success('删除成功', projectsInfo)
            } catch (error) {
                console.log(error);
                this.ctx.logger.error('find error: ', error);
                this.fail('删除项目失败'+error);
            }
        }

        async insertProject() {
            try {
                this.paramsValidate(methodParm.topLogo.insertProject.param);
                console.log('---- 项目 ----', this.params);
                let projectsInfo = await this.ctx.service.projects.createProject(this.params);
                this.success('插入项目成功', projectsInfo)
            } catch (error) {
                console.log('??????????????',error);
                this.ctx.logger.error('find error: ', error);
                this.fail('添加项目失败'+error);
            }
        }
    }
    return ProjectController;
}