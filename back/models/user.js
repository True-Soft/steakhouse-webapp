const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: ObjectId,
    email: String,
    password: String,
    name: String,
    phone: String,
    location: String,
    points: Number,
}, {
    versionKey: false
});

const User = mongoose.model('User' , userSchema)

module.exports = User;

