'use strict';
const util = require('../../libs/util');
const Controller = require('../core/base_controller');


module.exports = app => {
    let methodParm = {
        topLogo: {
            role: 'label',
            findAlllabel: {
                param: {
                    pageSize: {
                        type: 'any',
                        optional: true
                    },
                    pageNum: {
                        type: 'any',
                        optional: true
                    },
                    labelName: {
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
                    desc: '查找所有标签',
                    url: '',
                    middwareMethod: '',
                    method: 'findAlllabel'
                }
            },
            deleteLabelById: {
                param: {
                    labelId: {
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
                    desc: '通过ID删除标签',
                    url: '',
                    middwareMethod: '',
                    method: 'deleteLabelById'
                }
            },
            insertLabel: {
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
                    desc: '增加标签',
                    url: '',
                    middwareMethod: '',
                    method: 'insertLabel'
                }
            }
        }
    }
    app.loadApiswagger(methodParm);

    class LabelController extends Controller {
        async findAlllabel() {
            
            try {
                this.paramsValidate(methodParm.topLogo.findAlllabel.param);
                console.log('---- 查询标签 ----', this.params);
                const labelInfo = await this.ctx.service.label.findAllLabel(this.params);
                const count = await this.ctx.service.label.findCount()
                let result = {
                    labelInfo,
                    count
                }
                console.log('----result----',result);
                this.success('查询成功', result)
            } catch (error) {
                console.log(error);
                this.ctx.logger.error('find error: ', error);
                this.fail('查询失败'+error)
            }
        }

        async deleteLabelById() {
            
            try {
                this.paramsValidate(methodParm.topLogo.deleteLabelById.param);
                console.log('---- 标签ID ----', this.params);
                let {
                    labelId
                } = this.params;
                let labelInfo = await this.ctx.service.label.deleteLabel(labelId);
                this.success('删除成功', labelInfo)
            } catch (error) {
                console.log(error);
                this.ctx.logger.error('find error: ', error);
                this.fail('删除标签失败',error);
            }
        }

        async insertLabel() {
            try {
                this.paramsValidate(methodParm.topLogo.insertLabel.param);
                console.log('---- 标签 ----', this.params);
                let labelInfo = await this.ctx.service.label.createLabel(this.params);
                this.success('插入标签成功', labelInfo)
            } catch (error) {
                console.log('??????????????',error);
                this.ctx.logger.error('find error: ', error);
                this.fail('添加标签失败',error);
            }
        }
    }
    return LabelController
}