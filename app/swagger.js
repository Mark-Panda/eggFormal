'use strict';

/**
 * @first 所属分组
 * @param 入参对象
 * @ends  出参对象
 */

 function swaggerConfig(first, param, ends){
     console.log('入参',param);
     console.log('出参',ends);
     let swagConfig = {
        tags: [
          
        ],
        summary: '用户 login',
        description: '登录接口',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'admin\'s username & password',
            required: true,
            schema: {
              type: 'object',
              required: [ 'username', 'password' ],
              properties: {
              },
            },
          },
        ],
        responses: {
          200: {
            description: 'SUCCEED',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  description: 'status',
                },
                data: {
                  type: 'object',
                  description: 'data',
                  properties: {
                  },
                },
              },
            },
          },
        },
      }
      swagConfig.tags[0] = first
      
      param.forEach(element => {
          swagConfig.parameters[0].schema.properties[element] = {
              type : 'string',
              description : 'admin 入参' + element,
          }
      });

      return swagConfig
 }


 let role = 'admin'
 let param = ['username','password']
 let ends = ['token']
 let login = swaggerConfig(role, param, ends)

 module.exports = {login};