const mongoose = require('mongoose')
const Menu = require('../models/menu')
const {badRequestError, eternalServerError} = require('../errors')

class MongoRepository {
    constructor() {
        const menuSchema = new mongoose.Schema(Menu);
        this.menuModel = mongoose.model('Menu' , menuSchema);
    }

    async getMenuCollectionBySubject(subject) {
        try {
            return await this.menuModel.find({'subject': subject});
        } catch(err) {
            throw new eternalServerError(err)
        }
    }

}

module.exports = MongoRepository;
