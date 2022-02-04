const { ObjectId } = require('mongodb');

const Menu = {
    _id: ObjectId,
    title: String,
    price: Number,
    priceComment: String,
    header: String,
    subject: String,
};

module.exports = Menu;
