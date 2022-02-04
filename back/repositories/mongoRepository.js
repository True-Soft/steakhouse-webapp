const mongoose = require('mongoose');
const Menu = require('../models/menu');
const User = require('../models/user');
const {badRequestError, eternalServerError} = require('../errors');

module.exports = {
    async getMenuCollectionBySubject(subject) {
        try {
            return await Menu.find({'subject': subject});
        } catch(err) {
            throw new eternalServerError(err);
        }
    },

    async addUser(userInfo) {
        try {
            await User.create(userInfo);
        } catch(err) {
            throw new eternalServerError(err);
        }
    },

    async findUserByEmail(userInfo) {
        try {
            return await User.findOne(userInfo)
        } catch(err) {
            throw new eternalServerError(err);
        }
    }
}

