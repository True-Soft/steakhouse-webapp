const { hash, jwtSign } = require("../middleware/middleware");
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
            const user = await mongoRepository.findUser({email: userInfo.email});
            if(user) {
                const err = "This user exists";
                console.error(err);
                res.status(400).json(err);
                return
            }
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
            const user = await mongoRepository.findUser(userInfo);
            if(!user) {
                res.status(404).json("User not found");
                return;
            }
            const token = jwtSign({
                email: user.email,
                password: user.password,
            });
            res.status(200).json({ name: user.name, token})
        } catch(err) {
            console.error(err);
            res.status(err.status).json(err);
        }
    },
}
