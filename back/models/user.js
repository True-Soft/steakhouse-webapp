const { ObjectId } = require('mongodb');

const User = {
    userId: ObjectId,
    email: String,
    password: String,
    name: String,
    phone: String,
    location: String,
    points: Number,
};

module.exports = User;

