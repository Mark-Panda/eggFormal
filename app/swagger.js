'use strict';

/**
 * @first 所属分组
 * @param 入参对象
 * @ends  出参对象
 */

 function swaggerConfig(first, param, ends, desc){
    //  console.log('入参',param);
    //  console.log('出参',ends);
     let swagConfig = {
        tags: [
          
        ],
        summary: '',
        description: '',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: '请求的入参参数',
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
          success: {
            description: '请求成功后返回的信息',
            schema: {
              type: 'object',
              properties: {
                // status: {
                //   type: 'string',
                //   description: 'status',
                // },
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
      console.log('---param--',param);
      swagConfig.tags[0] = first
      swagConfig.summary = desc
      swagConfig.description = desc
      param.forEach(element => {
          swagConfig.parameters[0].schema.properties[element] = {
              type : 'string',
              description : 'admin 入参' + element,
          }
      });
      ends.forEach(element => {
          swagConfig.responses.success.schema.properties.data.properties[element] = {
            type : 'string',
            description : '接口出参参数' + element,
          }
      })

      return swagConfig
 }
 module.exports = swaggerConfig;