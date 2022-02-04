const { hash } = require("../middleware/middleware");
const mongoRepository = require('../repositories/mongoRepository');

module.exports = {
    async signUp(req ,res) {
        if(!req.body.name || !req.body.email || !req.body.password) {
            const err = "Bad request";
            console.error(err);
            res.status(400).json(err);
            return
        }
        const userInfo = {
            name: req.body.name,
            email: req.body.email,
            password: hash(req.body.password)
        }
        try {
            await mongoRepository.addUser(userInfo);
            res.status(200).send("OK");
        } catch(err) {
            console.error(err);
            res.status(err.status).json(err);
        }
    },

    async login(req, res) {
        if(!req.body.email || !req.body.password){
            const err = "Bad request";
            console.error(err);
            res.status(400).json(err);
            return
        }
        const userInfo = {
            email: req.body.email,
            password: hash(req.body.password)
        }
        try {
            const user = await mongoRepository.findUserByEmail(userInfo);
            res.status(200).json(user);
            //TODO jwt
        } catch(err) {
            console.error(err);
            res.status(err.status).json(err);
        }
    },
}
