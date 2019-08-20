'use strict';
const util = require('../../libs/util');
const Controller = require('../core/base_controller');


module.exports = app => {
    let methodParm = {
        topLogo: {
            role: 'link',
            findAlllink: {
                param: {
                    pageSize: {
                        type: 'any',
                        optional: true
                    },
                    pageNum: {
                        type: 'any',
                        optional: true
                    },
                    linkType: {
                        type: 'any',
                        optional: true
                    },
                    linkName: {
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
                    desc: '查找所有链接',
                    url: '',
                    middwareMethod: '',
                    method: 'findAlllink'
                }
            },
            deleteLinkById: {
                param: {
                    linkId: {
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
                    desc: '通过ID删除链接',
                    url: '',
                    middwareMethod: '',
                    method: 'deleteLinkById'
                }
            },
            insertLink: {
                param: {
                    linkName: {
                        type: 'string'
                    },
                    linkAddress: {
                        type: 'string'
                    },
                    linkType: {
                        type: 'string'
                    },
                    desc: {
                        type: 'string',
                        optional: true
                    },
                    icro: {
                        type: 'string',
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
                    desc: '增加链接',
                    url: '',
                    middwareMethod: '',
                    method: 'insertLink'
                }
            }
        }
    }
    app.loadApiswagger(methodParm);

    class LinkController extends Controller {
        async findAlllink() {
            
            try {
                this.paramsValidate(methodParm.topLogo.findAlllink.param);
                console.log('---- 查询链接 ----', this.params);
                const labelInfo = await this.ctx.service.link.findAllLink(this.params);
                const count = await this.ctx.service.link.findCount()
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

        async deleteLinkById() {
            
            try {
                this.paramsValidate(methodParm.topLogo.deleteLinkById.param);
                console.log('---- 链接ID ----', this.params);
                let {
                    linkId
                } = this.params;
                let linkInfo = await this.ctx.service.link.deleteLink(linkId);
                this.success('删除成功', linkInfo)
            } catch (error) {
                console.log(error);
                this.ctx.logger.error('find error: ', error);
                this.fail('删除链接失败',error);
            }
        }

        async insertLink() {
            try {
                this.paramsValidate(methodParm.topLogo.insertLink.param);
                console.log('---- 链接 ----', this.params);
                let labelInfo = await this.ctx.service.link.createLink(this.params);
                this.success('插入链接成功', labelInfo)
            } catch (error) {
                console.log('??????????????',error);
                this.ctx.logger.error('find error: ', error);
                this.fail('添加链接失败',error);
            }
        }
    }
    return LinkController
}