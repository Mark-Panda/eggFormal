'use strict'

/**
 * 检查参数输入是否全
 */

module.exports = (obe1, obe2) => {
    let push = []
    let tmp
    let result = []
    for (const key in obe1) {
        if (obe1.hasOwnProperty(key)) {
            const element = obe1[key];
            if (element.hasOwnProperty('optional')) {
                tmp = key
            }else{
                tmp = key
                push.push(key)
            }
        }
    }
    for (const item of push) {
        if(!obe2.hasOwnProperty(item)){
            result.push(item)
            // return item
        }
    }
    return result
}