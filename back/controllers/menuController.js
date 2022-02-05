const mongoRepository = require('../repositories/mongoRepository');

module.exports = {
    async getMenuBySubject(req ,res) {
        try {
            const subject = req.params.subject;
            const menuArr = await mongoRepository.getMenuCollectionBySubject(subject);
            res.json(menuArr);
        }catch(err) {
            res.status(err.status).json(err.message);
        }
    },
}
