const { badRequestError } = require('../errors');
const { hash, jwtVerify } = require('../middleware/middleware');
const mongoRepository = require('../repositories/mongoRepository');

module.exports = {
    async updateProfile(req , res) {
        try {
            const token = req.header('authorization');
            if(!token) {
                throw new badRequestError("No authorization token");
            }
            const user = jwtVerify(token);
            const profileInfo = req.body;
            profileInfo.email = user.email;
            if(req.body.password) {
                profileInfo.password = hash(req.body.password);
            }
            await mongoRepository.updateUser(profileInfo);
            res.json("OK");
        } catch(err) {
            res.status(err.status).json(err.message);
        }
    },

    async profileInfo(req , res) {
        try{
            const token = req.header('authorization');
            if(!token) {
                throw new badRequestError("No authorization token");
            }
            const user = jwtVerify(token);
            const profile = await mongoRepository.findUser(user);
            res.json(profile);
        }catch(err) {
            res.status(err.status).json(err.message);
        }
    },
}
