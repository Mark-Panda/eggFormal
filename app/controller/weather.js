'use strict';

let rp = require('request-promise');
const Controller = require('../core/base_controller');
module.exports = app => {
    let methodParm = {
        topLogo: {
            role: 'weather',
            getWeather: {
                param: {
                    cityname: {
                        type: 'string'
                    },
                },
                ginseng: {
                    msg: {
                        type: 'string'
                    },
                    data: {
                        type: 'object'
                    },
                    status: {
                        type: 'int'
                    },
                    code: {
                        type: 'int'
                    },
                },
                rule: {
                    desc: '获取城市天气',
                    url: '',
                    middwareMethod: '',
                    method: 'getWeather'
                }
            }
        }
    }
    app.loadApiswagger(methodParm);
    class WeatherController extends Controller {
        async getWeather() {
            this.paramsValidate(methodParm.topLogo.getWeather.param); //状态码  201 参数错误
            try {
                // console.log('=====',this.params);
                let qs = {
                    key: 'c23a988b92104f1aaf0ddd1959db8718',
                    cityname: this.params.cityname
                }
                let option = {
                    url: 'http://api.avatardata.cn/Weather/Query',
                    qs,
                    headers: {
                        'cache-control': 'no-cache',
                        Connection: 'keep-alive',
                        'accept-encoding': 'gzip, deflate',
                        Host: 'api.avatardata.cn',
                        'Postman-Token': 'b7f7d26e-e73a-4021-82f9-963587106852,1ed8215e-36d8-4070-857e-e9ed0c59aca6',
                        'Cache-Control': 'no-cache',
                        Accept: '*/*',
                        'User-Agent': 'PostmanRuntime/7.15.0'
                    }
                }
                let weatherInfo = await rp(option)
                console.log('=====', weatherInfo);
                this.success('注册成功', weatherInfo)
            } catch (e) {
                this.ctx.logger.error('获取天气异常: ', e);
                this.fail('获取天气失败'+e);
            }
        }
    }
    return WeatherController;
}