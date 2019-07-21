'use strict';
/**
 * 扩展 全局 help
 * @version 1.0.20180909
 */

const crypto = require('crypto');
const secretKey = 'c450b90d1d35d52cc87cb2f4c3f651060feb2994ced';
const jsonwebtoken = require('jsonwebtoken');
const rp = require('request-promise');
const URLSafeBase64 = require('urlsafe-base64');
const iconv = require('iconv-lite');


module.exports = {
    parseInt(string) {
        if (typeof string === 'number') return string;
        if (!string) return string;
        return parseInt(string) || 0;
    },
    /**
     * 
     * @param {密码加密} password 
     */
    encrypt(password) {  
        const hash = crypto.createHmac('sha256', secretKey).update(password).digest('hex');
        return hash;
    },
    /**
     * 密码对比
     * @param {输入密码} plain 
     * @param {数据库的密码} hash 
     */
    comparePassord(plain, hash) {  
        return hash === this.encrypt(plain);
    },
    safeParse(obj) {
        let json = {};
        try {
             json = JSON.parse(obj)
        } catch (err) {
             return err;
        }
        return json;
    },
    /**
     * 
     * @param {jwt生成token} userid 
     */
    createToken(userid) {
        let token = jsonwebtoken.sign({ userid: userid }, secretKey);
        return token;
    },
    /**
     * 
     * @param {jwt验证token} token 
     */
    decodeToken(token) {
        let decoded = jsonwebtoken.verify(token, secretKey);
        return decoded;
    },
    objHasKey(obj) {
        if (Object.keys(obj).length === 0) {
            return false // 如果为空,返回false
        }
        return true // 如果不为空，则会执行到这一步，返回true
    },

    /**
     * aes加密
     * @param data 待加密内容
     * @param key 必须为32位私钥
     * @returns {string}
     */
    aesEncryption(data, key, iv) {
        iv = iv || "";
        var clearEncoding = 'utf8';
        var cipherEncoding = 'base64';
        var cipherChunks = [];
        var cipher = crypto.createCipheriv('aes-256-ecb', key, iv);
        cipher.setAutoPadding(true);
        cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
        cipherChunks.push(cipher.final(cipherEncoding));
        return cipherChunks.join('');
    },

    /**
     * aes加密 safe-url
     * @param data 待加密内容
     * @param key 必须为32位私钥
     * @returns {string}
     */
    aesEncryptionSafeBase64(data, secretKey) {
        console.log('data, secretKey ', data, secretKey);

        secretKey = new Buffer(secretKey, "utf8");
        secretKey = crypto.createHash("md5").update(secretKey).digest("hex");
        secretKey = new Buffer(secretKey, "hex");

        let cipher = crypto.createCipheriv("aes-128-ecb", secretKey, '');
        let coder = [];
        coder.push(cipher.update(data, "utf8", "hex"));
        coder.push(cipher.final("hex"));
        let bs = coder.join("");

        const buf = Buffer.from(bs, 'hex');
    	let safeBs = URLSafeBase64.encode(buf);
        console.log('data, secretKey bs, safeBs', data, secretKey, bs, safeBs);
    	return safeBs
    },

    /**
     * aes解密
     * @param data 待解密内容
     * @param key 必须为32位私钥
     * @returns {string}
     */
    aesDecryption(data, key, iv) {
        if (!data) {
            return "";
        }
        iv = iv || "";
        var clearEncoding = 'utf8';
        var cipherEncoding = 'base64';
        var cipherChunks = [];
        var decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
        decipher.setAutoPadding(true);
        cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
        cipherChunks.push(decipher.final(clearEncoding));
        return cipherChunks.join('');
    },
    /**
     * 请求错误 handle
     *
     * @param  {Object} e    error
     * @param  {Object} options 请求参数
     */
    _handleRequstError(e, options) {
        console.log('-----------request error---------')
        console.log(e)

        let msg = `req ${options.uri} error`;
        e.msg = msg;
        e.options = options;
        this.ctx.throw(405, msg, {
            msg: msg,
            status: 405,
            options: options
        });
    },
    /**
     * get - http get 请求
     *
     * @param  {string} url    请求地址
     * @param  {Object} params 参数对象
     * @return {Object}        接口返回值
     */
    async _getWithJson(url, params) {
        console.log('_getWithJson');
        let options = {
            method: 'GET',
            uri: url,
            qs: params,
            json: true // Automatically parses the JSON string in the response
        };
        try {
            let data = await rp(options);
            return data;
        } catch (e) {
            this._handleRequstError(e, options)
        }
    },
    /**
     * get - http get 请求
     *
     * @param  {string} url    请求地址
     * @param  {Object} params 参数对象
     * @return {Object}        接口返回值
     */
    async _postWithJson(url, params) {
        let options = {
            method: 'POST',
            uri: url,
            body: params,
            rejectUnauthorized: false,
            json: true // Automatically stringifies the body to JSON
        };
        try {
            let data = await rp(options);
            return data;
        } catch (e) {
            console.log('_postWithJson error: ');
            console.log(e);
            this._handleRequstError(e, options)
        }
    },

    /**
     * post - http form 请求
     *
     * @param  {string} url    请求地址
     * @param  {Object} params 参数对象
     * @return {Object}        接口返回值
     */
    async _postWithForm(url, params) {
        let options = {
            method: 'POST',
            uri: url,
            form: params,
            json: false, // Automatically stringifies the body to JSON
            headers: {
                 'content-type': 'application/x-www-form-urlencoded'  // Is set automatically
            }
        };
        try {
            let data = await rp(options);
            return data;
        } catch (e) {
            this._handleRequstError(e, options)
        }
    },
     /**
     * post - http xml 请求
     *
     * @param  {string} url    请求地址
     * @param  {Object} params 参数对象
     * @return {Object}        接口返回值
     */
    async _postWithXml(url, params) {
            let body;
            if (params.needXml) {
                body = buildXML({ xml: params })
            } else {
                body = buildXML(params)
            }
            let options = {
                method: 'POST',
                url: url,
                body,
                json: false,
                headers: {
                    'content-type': 'text/html'
                }
            }
            try {
                let data = await rp(options);
                return data;
            } catch (e) {
                this._handleRequstError(e, options)
            }
    },

    /**
     * get - http get 请求
     *
     * @param  {string} url    请求地址
     * @param  {Object} params 参数对象
     * @return {Object}        接口返回值
     */
    async getData(url, params) {
        let result = await this._getWithJson(url, params);
        return result;
    },

    /**
     * post 请求
     *
     * @param  {string} url    请求地址
     * @param  {Object} params 参数对象
     * @param  {bool}   isForm 是否以表单进行请求，默认json形式
     * @return {Object}        接口返回值
     */
    async postData(url, params, type) {
        let result;
        switch (type) {
            case 'json':
                    result = await this._postWithJson(url, params);
                    break;
            case 'xml':
                    result = await this._postWithXml(url, params);
                    break;
            case 'form':
                    result = await this._postWithForm(url, params);
                    default:
                    break;
        }
        console.log('result',result);
        return result;
    },


    // hasValue
    hasValue(obj) {
        return JSON.stringify(obj) != "{}";
    }

};
