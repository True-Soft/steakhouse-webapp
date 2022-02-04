const MongoRepository = require('../repositories/mongoRepository');
const mongoRepository = new MongoRepository()

module.exports = {
    async getMenuBySubject(req ,res) {
        const subject = req.params.subject;
        try {
            const menuArr = await mongoRepository.getMenuCollectionBySubject(subject)
            res.status(200).json(menuArr);
        }catch(err) {
            console.error(err)
            res.status(err.status).json(err)
        }
    },
}
