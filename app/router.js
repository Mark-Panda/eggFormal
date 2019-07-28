'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

let swaggerConfig = require('./swagger');
let nameSpaceList = {
    // allPreuri: '/api/v1',
    lists: {
        admin: {
            method: ['register','login']
        },
        user: {
            method: ['register','login','updatePassword','forgetPassword','logOut']
        },
        weather: {
            method: ['getWeather']
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
        console.log('nameSpaceList' + key + '接口');
        if (allLists.hasOwnProperty(key) && controller.hasOwnProperty(key)){
            let configInfo = app.apiConfigList
            // console.log('-------接口配置信息-----',configInfo);
            for (let item of allLists[key].method) {
                
                // console.log('----接口细项---', item);
                let swaggerUrl = '/' + item;
                let swaggerInfo = configInfo[key].topLogo[item].param;
                let swaggerGinseng = configInfo[key].topLogo[item].ginseng;
                let swaggerDesc = configInfo[key].topLogo[item].rule.desc
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
                console.log('-----',swaggerUrl);
                router.all(swaggerUrl,controller[configInfo[key].topLogo.role][item]);
                swagger.post(swaggerUrl, swaggerConfig(configInfo[key].topLogo.role,swaggerInfoparm,swaggerOutparm,swaggerDesc));
            }
        }
    }

};
