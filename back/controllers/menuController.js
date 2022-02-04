const mongoRepository = require('../repositories/mongoRepository');

module.exports = {
    async getMenuBySubject(req ,res) {
        const subject = req.params.subject;
        try {
            const menuArr = await mongoRepository.getMenuCollectionBySubject(subject);
            menuJson = JSON.stringify(menuArr);
            menuJson = menuJson.replace(/\"_id\":/g, "\"menuId\":");
            res.status(200).json(JSON.parse(menuJson));
        }catch(err) {
            console.error(err);
            res.status(err.status).json(err);
        }
    },
}
