const mongoose = require('mongoose');
const Menu = require('../models/menu');
const User = require('../models/user');
const {badRequestError, internalServerError} = require('../errors');

module.exports = {
    async getMenuCollectionBySubject(subject) {
        try {
            return await Menu.find({'subject': subject});
        } catch(err) {
            throw new internalServerError(err);
        }
    },

    async addUser(userInfo) {
        try {
            await User.create(userInfo);
        } catch(err) {
            throw new internalServerError(err);
        }
    },

    async findUser(userInfo) {
        try {
            return await User.findOne(userInfo)
        } catch(err) {
            throw new internalServerError(err);
        }
    },

    async updateUser(userInfo) {
        try {
            await User.updateOne({email: userInfo.email} , userInfo)
        } catch(err) {
            throw new internalServerError(err);
        } 
    }
}

