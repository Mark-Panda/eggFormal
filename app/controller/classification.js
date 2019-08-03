'use strict';
const util = require('../../libs/util');
const Controller = require('../core/base_controller');


module.exports = app => {
    let methodParm = {
        topLogo: {
            role: 'classification',
            findAllclass: {
                param: {},
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
                    desc: '查找所有分类',
                    url: '',
                    middwareMethod: '',
                    method: 'findAllclass'
                }
            },
            deleteClassById: {
                param: {
                    classificationId: {
                        type: 'string'
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
                    desc: '通过ID删除分类',
                    url: '',
                    middwareMethod: '',
                    method: 'deleteClassById'
                }
            },
            insertClass: {
                param: {
                    classificationName: {
                        type: 'string'
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
                    desc: '增加分类',
                    url: '',
                    middwareMethod: '',
                    method: 'insertClass'
                }
            }
        }
    }
    app.loadApiswagger(methodParm);

    class ClassificationController extends Controller {
        async findAllclass() {
            this.paramsValidate(methodParm.topLogo.findAllclass.param);
            try {
                console.log('---- 查询分类 ----', this.params);
                const classificationInfo = await this.ctx.service.classification.findAllclassification();
                this.success('查询成功', classificationInfo)
            } catch (error) {
                console.log(error);
                this.ctx.logger.error('find error: ', error);
                this.fail('查询失败')
            }
        }

        async deleteClassById() {
            this.paramsValidate(methodParm.topLogo.deleteClassById.param);
            try {
                console.log('---- 分类ID ----', this.params);
                let {
                    classificationId
                } = this.params;
                let classificationInfo = await this.ctx.service.classification.deleteClassification(classificationId);
                this.success('删除成功', classificationInfo)
            } catch (error) {
                console.log(error);
                this.ctx.logger.error('find error: ', error);
                this.fail('删除失败');
            }
        }

        async insertClass() {
            this.paramsValidate(methodParm.topLogo.insertClass.param);
            try {
                console.log('---- 分类 ----', this.params);
                let classificationInfo = await this.ctx.service.classification.createClassification(this.params);
                this.success('插入成功', classificationInfo)
            } catch (error) {
                console.log(error);
                this.ctx.logger.error('find error: ', error);
                this.fail('插入失败');
            }
        }
    }
    return ClassificationController
}