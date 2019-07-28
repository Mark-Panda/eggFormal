let rp = require('request-promise');

async function weather(city){
    let qs = { key: 'c23a988b92104f1aaf0ddd1959db8718',
    cityname: city }
    let option = {
        url: 'http://api.avatardata.cn/Weather/Query',
        qs,
        headers: { 'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'accept-encoding': 'gzip, deflate',
        Host: 'api.avatardata.cn',
        'Postman-Token': 'b7f7d26e-e73a-4021-82f9-963587106852,1ed8215e-36d8-4070-857e-e9ed0c59aca6',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        'User-Agent': 'PostmanRuntime/7.15.0' }
    }
    let weatherInfo = await rp(option)
    console.log('=====',weatherInfo);
}

weather('北京');

// var request = require("request");

// var options = { method: 'GET',
//   url: 'http://api.avatardata.cn/Weather/Query',
//   qs: 
//    { key: 'c23a988b92104f1aaf0ddd1959db8718',
//      cityname: '%E6%AD%A6%E6%B1%89' },
//   headers: 
//    { 'cache-control': 'no-cache',
//      Connection: 'keep-alive',
//      'accept-encoding': 'gzip, deflate',
//      Host: 'api.avatardata.cn',
//      'Postman-Token': 'b7f7d26e-e73a-4021-82f9-963587106852,1ed8215e-36d8-4070-857e-e9ed0c59aca6',
//      'Cache-Control': 'no-cache',
//      Accept: '*/*',
//      'User-Agent': 'PostmanRuntime/7.15.0' } };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });
