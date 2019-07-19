/**
 * 用于验证某个变量是否符合一组规则
 * v 1.0.170725
 */
'use strict';
const _ = require('lodash');

/*
*检查一个变量是否符合特定规则
*@param {anything} value 需要检测的变量
*@param {object} rule 规则json，当其为字符串的时候，相当于传入{type:rule}
*@param {boolean} [rule] 是否忽略规则检查，为真的时候不对rule的结构进行检查
*@return {boolean} 返回变量检查的结果是否符合指定规则
*@desc   基本规则json格式：
*          ｛
*                type:类型,        该规则限制变量类型，通常是一个字符串，字符串可以是"string","boolean","number","object","function","any"之一
*                                  当其值为一个json时，则变量应当是一个符合这个json格式的object
*                                  该规则也可以是一个函数，其形式为function(value,rule){},参数value是待检查参数，参数rule是对应规则，若验证通过则返回true,否则返回false
*                optional:布尔值， 该规则限制了变量是否可选的，若其不可选，则不能为未定义（但可以是null）
*                isArray:是否数组,  该规则决定了参数是否为一个符合规则的数组，为true时将把参数作为数组来检查
*                其他选项：对应值    根据type的不同，还可以有不同的扩展参数，具体内容详见对应check函数
*           ｝
*/
const check = function (value, rule, safeRule)
{
    //规则必须是字符串或者json
    if (!safeRule) {
        if (_.isString(rule)) {
            return check(value, { 'type': rule }, true);
        }
        else if (!_.isObject(rule)) {
            return false;
        }
    }

    //如果对象未定义直接根据其是否可选返回结果
    if (_.isUndefined(value)){
        return rule.optional ? true : false;
    }

    //如果对象是数组则对所有元素逐个进行匹配
    if (rule.isArray) {
        if (!_.isArray(value)) {
            return false;
        }
        rule.isArray = false;
        for (let i = 0; i < value.length; i++) {
            if (!check(value[i], rule, true)) {
                rule.isArray = true;
                return false;
            }
        }
        rule.isArray = true;
        return true;
    }

    //判断类型
    if (_.isFunction(rule.type)) {
        //类型如果是函数直接返回函数执行结果
        if (!rule.type(value, rule)) {
            return false;
        }
    }else if (_.isString(rule.type)) {
        //类型如果是字符串直接判断其是否属于指定类型
        //然后根据不同的类型调用对应的判断函数进行进一步检查
        switch(rule.type)
        {
            case 'any':
                return true;
                break;
            case 'string':
                if (!checkString(value, rule)) {
                    return false;
                }
                break;
            case 'boolean':
                if (!checkBoolean(value, rule)) {
                    return false;
                }
                break;
            case 'number':
                if (!checkNumber(value, rule)) {
                    return false;
                }
                break;
            case 'function':
                if (!_.isFunction(value)) { //因为无法验证函数的输入和输出因此对函数不需要进行更多检验
                    return false;
                }
                break;
            case 'object': //类型为对象的时候，只要目标是对象即可
                if (!_.isObject(value)) {
                    return false;
                }
                break;
            default:
                return false;
                break;
        }
    } else if (_.isObject(rule.type) && _.isObject(value)) {
        //类型如果是json，则判断对象是否属于同类json
        //判断方式是逐个检查json成员是否符合对应规则
        let keys = _.keys(rule.type);
        for (let i = 0; i < keys.length; i++) {
            if (!check(value[keys[i]], rule.type[keys[i]])) {
                return false;
            }
        }
    } else {
        return false;
    }

    return true;
}
/*
*检查一个字符串变量是否符合指定规则
*@param {string} value 需要检测的变量
*@param {object} rule 规则json
*@return {boolean} 返回变量检查的结果是否符合指定规则
*@desc   字符串扩展规则json格式：
*          {
*            regular:正则表达式,  字符串应该与正则表达式匹配
*            maxlength:数值，     字符串长度应该小于等于这个值
*            minlength:数值,      字符串长度应该大于等于这个值
*            in:数组,             字符串必须是候选数组中的一个,该属性比其他几个属性优先
*          }
*/
function checkString(value, rule) {
    if (!_.isString(value)) {
        return false;
    }
    //优先处理in选项
    if (_.isArray(rule.in)) {
        if (rule.in.indexOf(value) == -1) {
            return false;
        }
        return true;
    }
    //检查maxlength选项
    if (_.isNumber(rule.maxlength)) {
        if (value.length > rule.maxlength) {
            return false;
        }
    }
    //检查minlength选项
    if (_.isNumber(rule.minlength)) {
        if (value.length < rule.minlength) {
            return false;
        }
    }
    //检查regular选项
    if (rule.regular) {
        if (!rule.regular.test(value)) {
            return false;
        }
    }
    return true;
}
/*
*检查一个布尔变量是否符合指定规则
*@param {anything} value 需要检测的变量
*@param {object} rule 规则json
*@return {boolean} 返回变量检查的结果是否符合指定规则
*@desc   布尔扩展规则json格式：
*          ｛
*           ｝
*/
function checkBoolean(value, rule) {
    if (!_.isBoolean(value)) {
        return false;
    }
    //待追加
    return true;
}
/*
*检查一个数值变量是否符合指定规则
*@param {anything} value 需要检测的变量
*@param {object} rule 规则json
*@return {boolean} 返回变量检查的结果是否符合指定规则
*@desc   数值扩展规则json格式：
*          {
*            min:数值,         最小值，数值不能小于这个值 
*            max:数值,         最大值，数值不能大于这个值
*            in:数组，     数值必须是这个数组当中的一个
*            integer:布尔值，  数字是否整数
*          }
*/
function checkNumber(value, rule) {
    if (_.isNaN(value) || !_.isNumber(value)) {
        return false;
    }
    //优先处理in选项
    if (_.isArray(rule.in)) {
        if (rule.in.indexOf(value) == -1) {
            return false;
        }
        return true;
    }
    //检查min选项
    if (_.isNumber(rule.min)) {
        if (value < rule.min) {
            return false;
        }
    }
    //检查max选项
    if (_.isNumber(rule.max)) {
        if (value > rule.max) {
            return false;
        }
    }
    //检查integer选项
    if (rule.integer) {
        if (!_.isInteger(value)) {
            return false;
        }
    }
    return true;
}

//导出接口
exports.string = checkString;
exports.boolean = checkBoolean;
exports.number = checkNumber;
exports.check = check;
 