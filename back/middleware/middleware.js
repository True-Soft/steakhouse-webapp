const { createHash } = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { forbiddenError } = require('../errors')
const dateTime = require('node-datetime');

module.exports = {
    hash(string) {
        return createHash('sha256').update(string).digest('hex');
    },

    jwtSign(tokenInfo) {
        console.log(tokenInfo)
        return jwt.sign(tokenInfo , config.jwtKey , {
            expiresIn: "2h"});
    },

    jwtVerify(token) {
        try {
            const decoded = jwt.verify(token, config.jwtKey);
            return decoded;
        } catch (err) {
            throw new forbiddenError(err);
        }
    },

    currentDate() {
        const dt = dateTime.create();
        const  formatted = dt.format('Y-m-d H:M:S');
        return formatted;
    }
}
