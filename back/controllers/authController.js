const { badRequestError, notFoundError } = require("../errors");
const { hash, jwtSign } = require("../middleware/middleware");
const mongoRepository = require('../repositories/mongoRepository');

module.exports = {
    async signUp(req ,res) {
        try{
            if(!req.body.name || !req.body.email || !req.body.password) {
                const err = "Bad request";
                throw new badRequestError(err);
            }
            const userInfo = {
                name: req.body.name,
                email: req.body.email,
                password: hash(req.body.password)
            }
            const user = await mongoRepository.findUser({email: userInfo.email});
            if(user) {
                const err = "This user exists";
                throw new badRequestError(err);
            }
            await mongoRepository.addUser(userInfo);
            res.json("OK");
        } catch(err) {
            res.status(err.status).json(err.message);
        }
    },

    async login(req, res) {
        try{
            if(!req.body.email || !req.body.password){
                const err = "Bad request";
                throw new badRequestError(err);
            }
            const userInfo = {
                email: req.body.email,
                password: hash(req.body.password)
            }
            const user = await mongoRepository.findUser(userInfo);
            if(!user) {
                const err = "User not found";
                throw new notFoundError(err);
            }
            const token = jwtSign({
                email: user.email,
                password: user.password,
            });
            res.json({ name: user.name, token})
        } catch(err) {
            res.status(err.status).json(err.message);
        }
    },
}
