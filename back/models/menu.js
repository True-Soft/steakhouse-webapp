const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    _id: ObjectId,
    title: String,
    price: Number,
    priceComment: String,
    header: String,
    subject: String,
} , {
    versionKey: false
});

const Menu = mongoose.model('Menu' , menuSchema)

module.exports = Menu;
