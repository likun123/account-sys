const codes = require('./codes');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

let util = {
    checkLogin(ctx) {
        let uid = localStorage.getItem("user");
        if (!uid) {
            return codes[1005];
        } else {
            return codes[0];
        }
    },
    generateToken(data) {
        let created = Math.floor(Date.now() / 1000);
        let cert = fs.readFileSync(path.join(__dirname, '../config/pri.pem'));
        let token = jwt.sign({
            data,
            exp: created + 3600 * 24
        }, cert, { algorithm: 'RS256' });
        return token;
    },
    verifyToken(token) {
        let cert = fs.readFileSync(path.join(__dirname, '../config/pub.pem')), res = {};
        try {
            let result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {};
            let { exp = 0 } = result, current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result.data || {};
            }
        } catch (e) {

        }
        return res;
    },
    /**
 *判断是否为空
 *
 * @param {String} val
 * @returns 
 */
    isNull(val) {
        if (val == undefined || val == null || val == "" || val == '' || val == "undefined" || val == "null" || val == "NULL" || val == "0" || val == 0) {
            return true
        }
        return false
    }
}

module.exports = util;