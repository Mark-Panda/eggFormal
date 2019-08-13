/**
* 用于检验一个json是否符合指定的规则，并将结果写入一个json返回
* v 1.2.170707
*/
'use strict';

//加载模块
const _ = require('lodash');
const vc = require('./vcheck'); //v 2.0

/*
*检验json是否符合指定规则，并将过滤后的结果写入一个json返回
*@param {object} params 校验参数
*@param {object} rules  校验规则
*@desc  1、params的json格式
*           {
*              参数1:值,
*              参数2:值,
*              ...
*           }
*       2、rules的json格式
*           {
*              参数1:参数校验规则json
*              参数2:参数校验规则json
*              ...
*           }
*       3、说明：
*           (1)params与rules一一对应,若有任意参数不符合对应的规则,则校验不通过.
*           (2)rules规则:
*              本模块主要通过vcheck模块进行规则验证，因此基本规则可参见vcheck模块。
*              在vcheck模块的基础上，本模块也提供了额外几个规则供使用：
*              ｛
*                  value:值,          默认值，该规则允许在找不到对应参数的时候用默认值填充该参数(同时默认值也应当符合规则)
*                  rename:字符串，    该规则允许在转存参数的时候，使用指定的名字存入过滤结果
*                  filed:字符串/数组，使用该规则以后，在转存参数的时候将不再存入默认区域，而改为存到默认区域下指定的一个或多个子区域
*                  autoArray:布尔值,  若该值为真，则自动把params转化为数组再进行检查，同时结果也会作为数组储存
*                  needParse:布尔值,  若该值为真，则在验证前先对参数执行一遍JSON.parse再进行验证
*              ｝
*        4、例：从表单req获取的数据key:value,value都为字符串,validator会根据type进行转换成对应类型的值
*           let params = {
*               name: 'myName',
*               age: '20',
*               sex: '1',
*               marry: 'true'
*           };
*           let rules = {
*               name: { type: 'string', maxlength: 5 },
*               age: { type: 'number', min: 1, integer: true },
*               sex: { type: 'number', in: [0, 1] },
*               marry: { type:'boolean'}
*           };
*@return {json} 校验后返回的json对象
*        json格式说明：
*        {
*           datas:{},
*           error:字符串
*        }
*        datas:校验成功时返回过滤好的新json
*        error:只有校验失败时该值存在，并且包含一个错误信息
*
*/
function validator(params, rules) {
    let result = {
        data: {}
        //error:undefined 仅当捕获到错误时追加error
    };
    //待校验参数是否合法对象
    if (!_.isObjectLike(params)) {
        result.error = '校验错误:待校验参数不是一个可解析的对象';
        return result;
    }
    //根据校验规则逐个检查参数
    const keys = _.keysIn(rules);
    for (let key in rules) {
        let param = params[key];
        let rule = rules[key];
        //如果缺少参数并且有默认值则填充默认值，默认值不需要验证
        if (_.isUndefined(param)) {
            console.log('走这里？');
            if (!_.isUndefined(rule.value)) {
                fillResult(rule.value, key, rule, result, true);
            } else {
                fillResult(param, key, rule, result);
            }
        }
        else {
            //如果启用了needParse参数，则先处理一遍param
            if (rule.needParse && _.isString(param)) {
                param = safeParse(param);
            }
            //如果启用了autoArray参数，则需要保证param为数组
            if (rule.autoArray) {
                console.log('33333',param);
                rule.isArray = true;
                if (!_.isArray(param)) {
                    param = [param];
                }
            }
            //若没有使用needParse，则转换数据类型为目标类型
            if (!rule.needParse) {
                param = typecast(param, rule);
            }
            console.log('0000000',result);
            fillResult(param, key, rule, result);
        }
    };
    return result;
}

//检查并填充结果
function fillResult(param, key, rule, result, withoutCheck) {
    if (withoutCheck || vc.check(param, rule)) {
        let save = key;
        //如果有rename规则就把过滤结果存入新名称下
        if (_.isString(rule.rename)) {
            save = rule.rename;
        }
        //根据filed选项来确定过滤结果储存的位置
        let filed = rule.filed;
        console.log('++++++',rule);
        console.log('------',result);
        if (!filed) {
            result.data[save] = param;
        } else if (_.isString(filed)) {
            if (!_.isObject(result.data[filed])) {
                result.data[filed] = {};
            };
            result.data[filed][save] = param;
        } else if (_.isArray(filed)) {
            for (let i = 0; i < filed.length; i++) {
                let target = filed[i];
                if (!_.isObject(result.data[target])) {
                    result.data[target] = {};
                };
                result.data[target][save] = param;
            };
        }
    }
    else {
        result.error = `参数${key}校验失败(${param})`;
        return result;
    }
}

//类型转换:将值按规则转化为指定类型
//@param  {any}  param  任何变量
//@param  {json} rule   校验规则
//@return {any}  返回转换结果，当转换失败时返回undefined
//@desc   rule的json格式：此处只用到了vcheck中的类型规则，详见vcheck模块
function typecast(param, rule) {
    //得到类型
    let type = _.isString(rule) ? rule : rule.type;
    if (_.isObject(type)) {
        type = 'object';
    }
    switch (type) {
        case 'boolean':
            let s = param.toString().toLowerCase();
            if (s === 'true' || s === '1') {
                return true;
            } else if (s === 'false' || s === '0') {
                return false;
            } else {
                return;
            }
            break;
        case 'number':
            return _.toNumber(param);
            break;
        case 'string':
            if (!_.isString(param)) {
                return param.toString;
            }
            break;
        case 'object':
            if (_.isString(param)) {
                return safeParse(param);
            }
        default:
            break;
    }
    return param;
}

function safeParse(val) {
    try {
        return JSON.parse(val);
    } catch (e) {
        return val;
    }
}

//导出模块
module.exports = validator;

/*@sample
let validator = require('validator');
let params = {
    name: 'myName',
    age: '20',
    sex: '1',
    marry: 'true'
};
let rules = {
    name: { type: 'string', maxlength: 5 },
    age: { type: 'number', min: 1, integer: true },
    sex: { type: 'number', in: [0, 1] },
    marry: { type:'boolean'}
};
//校验函数调用
let result = validator(params,rules);
if(result.error){
    console.log(result.error);
}else{
    console.log(result.data);
}
//*/
