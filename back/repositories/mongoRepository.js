const Menu = require('../models/menu');
const User = require('../models/user');

const Purchase = require('../models/Purchase');
const {internalServerError} = require('../errors');
const { getMenuSubjects } = require('../controllers/menuController');

module.exports = {
    async getMenuCollectionBySubject(subject) {
        try {
            return await Menu.find({'subject': subject});
        } catch(err) {
            throw new internalServerError(err);
        }
    },

    async getMenuById(menuId) {
        try {
            return await Menu.findOne({'_id': menuId})
        } catch(err) {
            throw new internalServerError(err);
        }
    },

    async getMenuSubjects() {
        try {
            return await Menu.find({});
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
    },

    async addPurchase(purchase) {
        try {
            await Purchase.insertMany(purchase);
        } catch(err) {
            throw new internalServerError(err);
        }
    },

    async getPurchase(email) {
        try {
            return await Purchase.aggregate([{ $match : { email: email } } , 
                                            {$group : {_id:{menuId:"$menuId", email:"$email" , date: "$date"}, amount:{$sum:1}}}]);
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

