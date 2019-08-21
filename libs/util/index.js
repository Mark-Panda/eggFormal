const moment = require('moment');
const crypto = require('crypto');
const utf8 = require('./utf8');
//处理返回数据只取数组的第一个数

exports.dealArray = function (object) {
    for (let k in object) {
        object[k] = object[k][0];
    }
    return object;
}
//用于抛出promise的异常
exports.Break = function (err) {
    return err;
}

//判断数组包含
exports.array_contain = function (array, obj) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == obj) //如果要求数据类型也一致，这里可使用恒等号===
            return true;
    }
    return false;
}


//MD5签名
exports.md5 = function (str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};

//生成一个唯一的订单号
exports.onlyId = function (len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;
    if (len) {

        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}

//加密
exports.encrypt = function (str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
};

//解密
exports.decrypt = function (str, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

//是否来自微信请求
exports.isRequestFromWeChat = function (ua) {
    return ua.toUpperCase().indexOf('MICROMESSENGER') > -1;
};

//是否来自支付宝请求
exports.isRequestFromAlipay = function (ua) {
    return ua.toUpperCase().indexOf('ALIPAY') > -1;
};

/** 检查字符串是否以subStr开头 **/
String.prototype.startWith = function (subStr) {
    if (subStr.length > this.length) {
        return false;
    } else {
        return (this.indexOf(subStr) == 0);
    }
};

/** 检查字符串是否以subStr结尾 **/
String.prototype.endWith = function (subStr) {
    if (subStr.length > this.length) {
        return false;
    } else {
        return (this.lastIndexOf(subStr) == (this.length - subStr.length));
    }
};

Array.prototype.indexOfObject = function (obj) {
    var find = -1;
    for (var i in this) {
        find = i;
        for (var j in obj) {
            if (!this[i][j] || this[i][j] != obj[j]) {
                find = -1;
                break;
            }
        }
        if (find > -1) return find;
    }
    return -1;
};

//格式化时间
var formatdate = exports.formatdate = function (date, style) {
    var y = date.getFullYear();
    var M = "0" + (date.getMonth() + 1);
    M = M.substring(M.length - 2);
    var d = "0" + date.getDate();
    d = d.substring(d.length - 2);
    var h = "0" + date.getHours();
    h = h.substring(h.length - 2);
    var m = "0" + date.getMinutes();
    m = m.substring(m.length - 2);
    var s = "0" + date.getSeconds();
    s = s.substring(s.length - 2);
    return style.replace('yyyy', y).replace('MM', M).replace('dd', d).replace('hh', h).replace('mm', m).replace('ss', s);
};
//生成全球唯一的guid
var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

exports.generateGuid = function () {
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}
/**
 * 16为随机数
 */
exports.generateGuid_16 = function () {
    return (S4() + S4() + S4() + S4());
}

/*
 从request肿获取用户ip地址
 */
exports.getClientIp = function (req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
};

exports.stringToDateTime = function (postdate) {
    if (postdate) {
        var second = 1000;
        var minutes = second * 60;
        var hours = minutes * 60;
        var days = hours * 24;
        var months = days * 30;
        var years = days * 365;
        var myDate = new Date(Date.parse(postdate));
        if (isNaN(myDate)) {
            myDate = new Date(postdate.replace(/-/g, "/"));
        }
        var nowtime = new Date();
        var longtime = nowtime.getTime() - myDate.getTime();
        var showtime = 0;
        if (longtime > years) {
            return (Math.floor(longtime / years) + "年前");
        } else if (longtime > months * 2) {

            if (myDate.getFullYear() == nowtime.getFullYear()) {
                return formatdate(myDate, 'MM月dd日');
            } else {
                return formatdate(myDate, 'yyyy年MM月dd日');
            }

            //            return myDate.toDateString().replace(nowtime.getFullYear() + '年', '');
            //            return myDate.getMonth() + '月' + myDate.getDate() + '日';
        } else if (longtime > months) {
            return "1个月前";
        } else if (longtime > days * 7) {
            return ("1周前");
        } else if (longtime > days) {
            return (Math.floor(longtime / days) + "天前");
        } else if (longtime > hours) {
            return (Math.floor(longtime / hours) + "小时前");
        } else if (longtime > minutes * 3) {
            return (Math.floor(longtime / minutes) + "分钟前");
        }
        //    else if (longtime > second)
        //    {
        //        return(Math.floor(longtime/second)+"秒前");
        //    }
        else { }
    }

    return '刚刚';
};

function formatFloat(src, pos) {
    return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
}

exports.meterToString = function (meter) {
    if (meter) {
        var km = 1000;
        var h = 100;
        var num = Number(meter);

        if (num > km * 100) {
            return "超过100公里";
        } else if (num > km * 10) {
            return (formatFloat(num / km, 0) + "公里");
        } else if (num > km) {
            return (formatFloat(num / km, 1) + "公里");
        } else if (num > h * 5) {
            return '1公里内';
        } else if (num > h * 2) {
            return '500米内';
        } else if (num > h) {
            return '200米内';
        } else {
            return '100米内';
        }
    }

    return '未知';
};

/**
 * Merge object source with object target.
 *
 *     var target = { foo: 'bar' }
 *       , source = { bar: 'baz' };
 *
 *     utils.merge(target, source);
 *     // => { foo: 'bar', bar: 'baz' }
 *
 * @param {Object} target
 * @param {Object} source
 * @return {Object}
 * @api private
 */

exports.merge = function (target, source) {
    if (target && source) {
        for (var key in source) {
            target[key] = source[key];
        }
    }
    return target;
};

//判断当前设备是否为移动设备
exports.isMobile = function (userAgent) {
    if (/Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(userAgent)) {
        return true;
    }
    return false;
};
//判断是否为Iphone
exports.isIPhone = function (userAgent) {
    if (/iPhone|iPod|iPad/i.test(userAgent)) {
        return true;
    }
    return false;
}
exports.HTMLEncode = function (str) {
    if (str.length == 0)
        return str;
    return str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/    /g, "&nbsp;")
        .replace(/\'/g, "&#146;")
        .replace(/\"/g, "&quot;")
        .replace(/\n/g, "<br>");
};

exports.HTMLDecode = function (str) {
    if (str.length == 0)
        return str;
    return str.replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&nbsp;/g, "    ")
        .replace(/'/g, "\'")
        .replace(/&quot;/g, "\"")
        .replace(/<br>/g, "\n");
};

// 地球半径
var earthRadius = 6378137.0; // m

// 计算距离在地球表面对应的弧度
// mongoDB中的maxDistance需要使用弧度
exports.getDistance = function (m) {
    return m / earthRadius;
};

/**
 * 求某个经纬度的值的角度值
 * @param {Object} d
 */
function calcDegree(d) {
    return d * Math.PI / 180.0;
}

/**
 * 根据两点经纬度值，获取两地的实际相差的距离
 * @param {Object} f    第一点的坐标位置[latitude,longitude]
 * @param {Object} t    第二点的坐标位置[latitude,longitude]
 */
exports.calcDistance = function (f, t) {
    if (f && t) {
        return getFlatternDistance(f[1], f[0], t[1], t[0]);
    } else {
        return undefined;
    }
};
/**
 * approx distance between two points on earth ellipsoid CHECK
 * @param {Object} lat1
 * @param {Object} lng1
 * @param {Object} lat2
 * @param {Object} lng2
 */
function getFlatternDistance(lat1, lng1, lat2, lng2) {
    var f = calcDegree((lat1 + lat2) / 2);
    var g = calcDegree((lat1 - lat2) / 2);
    var l = calcDegree((lng1 - lng2) / 2);

    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);

    var s, c, w, r, d, h1, h2;
    var a = earthRadius;
    var fl = 1 / 298.257;

    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;

    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;

    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * a;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;

    return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
}

/**
 * 检查是否是手机号
 * @param v 待检查的号码
 * @returns {boolean}
 */
exports.checkPhoneNumber = function (v) {
    //var r = /(1(([35][0-9])|(47)|[8][0-9]))\d{8}/;
    var r = /(1([3578][0-9]))\d{8}/;
    return (r.test(v) && (v.length === 11));
};

exports.checkIDCard = function (v) {
    //身份证正则表达式(15位)
    var isIDCard15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    //身份证正则表达式(18位)
    var isIDCard18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
    //return (isIDCard15.test(v) && v.length === 15) || (isIDCard18.test(v) && v.length === 18);
    return isIdCardNo(v);
};

exports.replaceGtAndLt = function (str, params) {
    if (str) {
        params = [
            { str: '&gt;', replace_to: '>' },
            {
                str: '&lt;',
                replace_to: '<'
            }, {
                str: '&amp;',
                replace_to: '&'
            }, {
                str: '&apos;',
                replace_to: "'"
            }, {
                str: '&quot;',
                replace_to: '"'
            }
        ];
        //for (var i in params) {
        //    var regex = '/' + params[i].str + '/g';
        //    str = str.replace(regex, params[i].replace_to);
        //    //str = str.replace(params[i].str, params[i].replace_to);
        //}
        //return str;
        return str.replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/'/g, "\'")
            .replace(/&quot;/g, "\"");
    } else {
        return null;
    }
};

function isIdCardNo(num) {
    num = num.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        return false;
    }
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    //下面分别分析出生日期和校验位
    var len, re;
    len = num.length;
    if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);
        //检查生日日期是否正确
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        } else {
            //将15位身份证转成18位
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0,
                i;
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            return num;
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);
        //检查生日日期是否正确
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        } else {
            //检验18位身份证的校验码是否正确。
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0,
                i;
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                return false;
            }
            return num;
        }
    }
    return false;
}
exports.IdCardVerify = function (num) {
    num = num.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        return false;
    }
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    //下面分别分析出生日期和校验位
    var len, re;
    len = num.length;
    if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);
        //检查生日日期是否正确
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        } else {
            //将15位身份证转成18位
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0,
                i;
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            return num;
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);
        //检查生日日期是否正确
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return false;
        } else {
            //检验18位身份证的校验码是否正确。
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0,
                i;
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                return false;
            }
            return num;
        }
    }
    return false;
}
/**
 * 生成订单号,9位数,到2050年增加到10位数
 * @param moment
 * @returns {string}
 */
exports.createOrderNo = function (moment) {
    if (!moment) {
        moment = require('moment');
    }
    var year = (moment().format('YY') * 1 - 15);
    var seconds = moment().format('DDD') * 24 * 60 * 60 + moment().format('HH') * 60 * 60 + moment().format('mm') * 60 + moment().format('ss') * 1;

    var order = seconds.toString(36);
    order = seconds_format(order, 5);
    var ran = ((Math.random() + '').substr(4, 3) + moment().format('SSS'));
    var random = (ran * 1).toString(36);
    random = seconds_format(random, 4);
    order = year.toString(36) + order;
    order += random;
    return order.toUpperCase();
};

/**
 * 生成平台订单号
 */
exports.createPlatformTradeNo = () => {
    let sec = Math.round(new Date().getTime() / 1000) - new Date('2017').getTime()
    let r1 = (Math.random() + '').substr(4, 2)
    let r2 = (Math.random() + '').substr(4, 3)
    let r3 = (Math.random() + '').substr(4, 3)
    let r4 = (Math.random() + '').substr(4, 3)
    let r = (('1' + r1 + r2 + r3 + r4) * 1).toString(36)
    return (sec.toString(36) + r).toUpperCase()
}

exports.createTransactionNo = function (moment) {
    if (!moment) {
        moment = require('moment');
    }
    var date = moment().format('YYYYMMDDHHmmss');
    var sss = moment().format('SSS');
    sss = seconds_format(sss, 3);
    var r1 = (Math.random() + '').substr(4, 3);
    var r2 = (Math.random() + '').substr(4, 3);
    var r3 = (Math.random() + '').substr(4, 3);
    var r4 = (Math.random() + '').substr(4, 3);
    return date + sss + r1 + r2 + r3 + r4;
};

function seconds_format(str, length) {
    if (str.length >= length)
        return str;
    else {
        for (; str.length < length;)
            str = '0' + str;
        return str;
    }
}

exports.generateNonceString = function (length) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var maxPos = chars.length;
    var noceStr = "";
    for (var i = 0; i < (length || 32); i++) {
        noceStr += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return noceStr;
};

exports.setCookie = (name, data, res, expires) => {
    res.cookie(name, data, { expires: new Date(Date.now() + expires) });
    // if (save) return res.cookie('settings.cookie_name_session', data);
    // var string_data = utils_.encrypt(JSON.stringify(data), 'settings.cookie_encrypt_secret');
    // console.log('string_data', string_data);
    // res.cookie('settings.cookie_name_session', string_data);
};

/**
 * 从身份证中获取生日
 */
exports.getBirthFromIdCard = (birthday, idCard) => {
    if (birthday) {

        return moment(birthday).format('YYYY-MM-DD')
    } else {
        let birthdayStr = '';
        if (15 == idCard.length) {
            birthdayStr = idCard.charAt(6) + idCard.charAt(7);
            if (parseInt(birthdayStr) < 10) {
                birthdayStr = '20' + birthdayStr;
            } else {
                birthdayStr = '19' + birthdayStr;
            }
            birthdayStr = birthdayStr + '-' + idCard.substring(8, 10) + '-' + idCard.substring(11, 12);
        } else if (18 == idCard.length) {
            birthdayStr = idCard.substring(6, 10) + '-' + idCard.substring(10, 12) + '-' + idCard.substring(12, 14);
        } else {
            let date = new Date();
            birthdayStr = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDay()}`;
        }
        return birthdayStr;
    }


}
// 过滤HTML标签以及&nbsp;
exports.removeHTMLTag = (str) => {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/\s/g, ""); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
    str = str.replace(/&nbsp;/ig, ''); //去掉&nbsp;
    str = str.replace(/\\n;/ig, ''); //去掉\n;
    return str;
}

exports.trimString = (str) => {
    return str.replace(/\s/g, "");
}

exports.Break = function (err) {
    return err;
}

function secondsFormat(str, length) {
    if (str.length >= length) {
        return str
    } else {
        for (; str.length < length;) {
            str = '0' + str
        }
        return str
    }
}

exports.accAdd = function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}

exports.accMul = function accMul(arg1, arg2) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

exports.createVerifyCode = function () {
    return (Math.random() * 10 + '').substr(2, 6);
}

exports.stopService = function () {
    let flag = false;
    //每日23:30 — 次日06:30不能进行挂号及缴费操作
    if (moment().format("HH").toString() == '23') {
        if (moment().format("HHmmss").toString() > '233000') flag = true;
    }
    if (moment().format("HH").toString() == '00' || moment().format("HH").toString() == '01' ||
        moment().format("HH").toString() == '02' || moment().format("HH").toString() == '03' ||
        moment().format("HH").toString() == '04' || moment().format("HH").toString() == '05' ||
        moment().format("HH").toString() == '06') {
        if (moment().format("HHmmss").toString() < '060000') flag = true;
    }
    return flag;
}
exports.randomNum = function (minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}
exports.stopPayService = function () {
    let flag = true;
    return flag;
}

exports.formatMoney = (money, useCentUnit = false) => {
    if ((money + '').indexOf('.') === -1) money += '.00001'
    else money += '0001'
    let constant = 100
    if (useCentUnit) constant = 1
    return (Math.floor((money * 100))) / constant
}



exports.createTradeNo = () => {
    let year = (moment().format('YY') * 1 - 15)
    let seconds = moment().format('DDD') * 24 * 60 * 60 + moment().format('HH') * 60 * 60 + moment().format('mm') * 60 + moment().format('ss') * 1
    let order = seconds.toString(36)
    order = secondsFormat(order, 5)
    let ran = ((Math.random() + '').substr(4, 3) + moment().format('SSS'))
    let random = (ran * 1).toString(36)
    random = secondsFormat(random, 4)
    order = year.toString(36) + order
    order += random
    return order.toUpperCase()
}

exports.createTransactionNo = () => {
    let date = moment().format('YYYYMMDDHHmmss')
    let sss = moment().format('SSS')
    sss = secondsFormat(sss, 3)
    let r1 = (Math.random() + '').substr(4, 3)
    let r2 = (Math.random() + '').substr(4, 3)
    let r3 = (Math.random() + '').substr(4, 3)
    let r4 = (Math.random() + '').substr(4, 3)
    return date + sss + r1 + r2 + r3 + r4
}


function createReservationCode4Second(max, length) {
    let arr = []
    for (; max > 0;) arr.push(secondsFormat(--max + '', length))
    return arr
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
let reservationCode = {};

async function createReservationCode() {
    let year = moment().format('YY') * 1 - 16
    let days = moment().format('DDD')
    let seconds = moment().format('HH') * 60 * 60 + moment().format('mm') * 60 + moment().format('ss') * 1
    const prefix = '_';
    const codeBoss = prefix + seconds;

    if (reservationCode[codeBoss]) {
        if (reservationCode[codeBoss].length) return year + secondsFormat(days, 3) + secondsFormat(seconds + '', 5) + reservationCode[codeBoss].pop()
        await sleep(100)
        return await createReservationCode()
    } else {
        reservationCode = {}
        reservationCode[codeBoss] = createReservationCode4Second(10, 1)
        return await createReservationCode()
    }
}

exports.createReservationCode = createReservationCode;

exports.escape = function (str) {
    return str.replace(/[^\u0000-\u00FF]/g, function ($0) { return escape($0).replace(/(%u)(\w{4})/gi, "&#x$2;") });
};

exports.calculateAge = function (birthDate) {
    let birthArr = birthDate.split("-");
    let birthYear = birthArr[0];
    let birthMonth = birthArr[1];
    let birthDay = birthArr[2];

    const now = moment().format('YYYY-MM-DD');
    let nowArr = now.split("-");
    let nowYear = nowArr[0];
    let nowMonth = nowArr[1];
    let nowDay = nowArr[2];

    let age;
    if (nowYear == birthYear) {
        age = 0;
    } else {
        let ageDiff = nowYear - birthYear;
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                let dayDiff = nowDay - birthDay;
                if (dayDiff < 0) {
                    age = ageDiff - 1;
                }
                else {
                    age = ageDiff;
                }
            }
            else {
                let monthDiff = nowMonth - birthMonth;
                if (monthDiff < 0) {
                    age = ageDiff - 1;
                }
                else {
                    age = ageDiff;
                }
            }
        }
        else {
            age = -1;
        }
    }
    return age;
}
