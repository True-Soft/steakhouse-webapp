const { createHash } = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { forbiddenError } = require('../errors')

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
    }
}
