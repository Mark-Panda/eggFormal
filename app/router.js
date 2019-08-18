'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

let swaggerConfig = require('../libs/util/swagger');
let _ = require('lodash');
let nameSpaceList = {
    // allPreuri: '/api/v1',
    lists: {
        user: {
            method: ['register', 'login', 'updatePassword', 'forgetPassword', 'logOut']
        },
        admins: {
            method: ['registerAdmin', 'loginAdmin', 'logOutAdmin', 'getAdminInfo']
        },

        weather: {
            method: ['getWeather']
        },
        article: {
            method: ['findArticle', 'findArticleByclass', 'createArticle', 'updateArticle', 'findArticleCount', 'destroyArticle', 'findArticleById']
        },
        classification: {
            method: ['findAllclass', 'deleteClassById', 'insertClass']
        },
        comment: {
            method: ['insertComment', 'destryComment', 'selectComment']
        },
        thumbsup: {
            method: ['articleThumbsup', 'articleNothumbsup']
        },
        label: {
            method: ['findAlllabel', 'deleteLabelById', 'insertLabel']
        }
    }
};

module.exports = app => {
    const {
        router,
        controller,
        swagger
    } = app;

    /**
     * 加载所有中间件中间件
     */
    const userAuthNeedLogin = app.middleware.userAuth({
        needLogin: true
    });
    const userAuthDontNeedLogin = app.middleware.userAuth({
        needLogin: false
    });
    // 中间件数组
    let middlewareList = {
        userAuthNeedLogin: userAuthNeedLogin,
        userAuthDontNeedLogin: userAuthDontNeedLogin
    };
    /**
     * 将middlewareList没有的中间件添加进去
     * @param {controller中的中间件名称} mideleInfo 
     */
    function appendMiddleware(mideleInfo) {
        middlewareList[mideleInfo] = mideleInfo;
        return middlewareList;
    }

    /**
     * swagger配置化，统一进行加载
     */
    let allLists = nameSpaceList.lists;
    for (let key in allLists) {
        // console.log('nameSpaceList' + key + '接口');
        if (allLists.hasOwnProperty(key) && controller.hasOwnProperty(key)) {
            let configInfo = app.apiConfigList
            // console.log('-------接口配置信息-----',configInfo);
            for (let item of allLists[key].method) {

                // console.log('----接口细项---', item);

                let configInfoNew = _.findIndex(configInfo, (item) => {
                    return item.topLogo.role === key
                })
                let swaggerUrl = '/' + item;
                let swaggerInfo = configInfo[configInfoNew].topLogo[item].param;
                let swaggerGinseng = configInfo[configInfoNew].topLogo[item].ginseng;
                let swaggerDesc = configInfo[configInfoNew].topLogo[item].rule.desc;
                let middlewareInfo = configInfo[configInfoNew].topLogo[item].rule.middwareMethod; //中间件方法


                let swaggerInfoparm = []
                let swaggerOutparm = []
                for (let elem in swaggerInfo) {
                    // console.log('----入参参数----',elem);
                    swaggerInfoparm.push(elem);
                }
                for (let elem in swaggerGinseng) {
                    // console.log('----出参参数----',elem);
                    swaggerOutparm.push(elem);
                }
                // console.log('-----',swaggerUrl);
                if (middlewareInfo) {
                    if (!middlewareList.indexOf(middlewareInfo)) {
                        appendMiddleware(middlewareInfo)
                    }
                    router.all(swaggerUrl, middlewareList[middlewareInfo], controller[configInfo[configInfoNew].topLogo.role][item]);
                } else {
                    router.all(swaggerUrl, controller[configInfo[configInfoNew].topLogo.role][item]);
                }
                swagger.post(swaggerUrl, swaggerConfig(configInfo[configInfoNew].topLogo.role, swaggerInfoparm, swaggerOutparm, swaggerDesc));
            }
        }
    }

};