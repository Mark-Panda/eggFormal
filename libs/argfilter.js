/**
 * 用于验证一组参数并返回过滤后的结果
 * v 1.2.170711
 */
'use strict';
const _ = require('lodash');
const vc = require('./vcheck') //v 2.0

/*
*传入arguments参数和相应的校验规则，根据规则返回一个包含了校验结果的json，若参数不符合规则则返回null
*@param {arguments} args 待校验的参数，建议直接使用js自带的arguments，也可传入数组 
*@param {object} rule 规则json
*@return {object} 校验成功时，返回一个包含了校验之后的参数的json；校验失败时，返回null
*@desc   规则json的格式
          {
            参数1:参数校验规则json，
            参数2:参数校验规则json，
            ...
          } 
          其中参数校验规则json主要参照vcheck模块的规则json，以下为在其基础上附加的规则：
          {
            value:值,    若该参数校验失败，则用value的值作为该参数的值填入校验结果json
          }
*/
const getArguments = function (args, rule) {
    let result = {};
    let keys = _.keys(rule);
    let i = 0;
    let j = 0;
    //参数和规则一一对应检测并赋值
    //当参数不符合对应规则，并且该规则是可选项时，就用当前参数去对应下一个规则
    while (i < args.length && j < keys.length) {
        while (j < keys.length) {
            let key = keys[j];
            j++;
            if (vc.check(args[i], rule[key])) {
                result[key] = args[i];
                break;
            }
            else if (rule[key].optional) {
                if (!_.isUndefined(rule[key].value)) {
                    result[key] = rule[key].value;
                }
            }
            else {
                return null;
            }
        }
        i++;
    }
    //如果参数检查完成，仍有规则尚未检测时，检查多出的规则是否可选以及是否有默认值
    while (j < keys.length) {
        let key = keys[j];
        if (!rule[key].optional) {
            return null;
        }
        else if (!_.isUndefined(rule[key].value)) {
            result[key] = rule[key].value;
        }
        j++;
    }
    return result;
}

exports.getArguments = getArguments; 