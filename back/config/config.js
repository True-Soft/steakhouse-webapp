require('dotenv').config({path:__dirname + '/../.env'});
module.exports = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.DB_URL,
    jwtKey: process.env.JWT_KEY,
}
