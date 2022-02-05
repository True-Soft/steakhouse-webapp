const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
    _id: ObjectId,
    menuId: ObjectId,
    email: String,
    date: Date,
} , {
    versionKey: false
});

const Purchase = mongoose.model('Purchase' , purchaseSchema)

module.exports = Purchase;
