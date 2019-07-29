'use strict';

module.exports = app => {


    // 加载接口 配置
    app.apiConfigList = []
    
    app.loadApiswagger = function(swaggeConfig){
        // console.log('---加载一次----',swaggeConfig);
        app.apiConfigList.push(swaggeConfig);

        // console.log('000000000', app.apiConfigList);
    }

};
