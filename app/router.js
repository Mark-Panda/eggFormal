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
            method: ['register','login','updatePassword','forgetPassword','logOut']
        },
        admins: {
            method: ['registerAdmin','loginAdmin']
        },
        
        weather: {
            method: ['getWeather']
        },
        article: {
            method: ['findArticle','findArticleByclass','createArticle','updateArticle']
        }
    }
};

module.exports = app => {
    const { router, controller, swagger } = app;

    /**
     * swagger配置化，统一进行加载
     */
    let allLists = nameSpaceList.lists;
    for (let key in allLists){
        // console.log('nameSpaceList' + key + '接口');
        if (allLists.hasOwnProperty(key) && controller.hasOwnProperty(key)){
            let configInfo = app.apiConfigList
            // console.log('-------接口配置信息-----',configInfo);
            for (let item of allLists[key].method) {
                
                // console.log('----接口细项---', item);
                
                let configInfoNew = _.findIndex(configInfo,(item) => { return item.topLogo.role === key})
                let swaggerUrl = '/' + item;
                let swaggerInfo = configInfo[configInfoNew].topLogo[item].param;
                let swaggerGinseng = configInfo[configInfoNew].topLogo[item].ginseng;
                let swaggerDesc = configInfo[configInfoNew].topLogo[item].rule.desc
                let swaggerInfoparm = []
                let swaggerOutparm = []
                for (let elem in swaggerInfo){
                    // console.log('----入参参数----',elem);
                    swaggerInfoparm.push(elem);
                }
                for (let elem in swaggerGinseng){
                    // console.log('----出参参数----',elem);
                    swaggerOutparm.push(elem);
                }
                // console.log('-----',swaggerUrl);
                router.all(swaggerUrl,controller[configInfo[configInfoNew].topLogo.role][item]);
                swagger.post(swaggerUrl, swaggerConfig(configInfo[configInfoNew].topLogo.role,swaggerInfoparm,swaggerOutparm,swaggerDesc));
            }
        }
    }

};
