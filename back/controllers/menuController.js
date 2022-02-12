const mongoRepository = require('../repositories/mongoRepository');

module.exports = {
    async getMenuBySubject(req ,res) {
        try {
            const subject = req.params.subject;
            const menuArr = await mongoRepository.getMenuCollectionBySubject(subject);
            const menuHeaders = [...new Map(menuArr.map(item =>
                [item['header'], item])).values()];
            let resultMenus = [];
            let counter = 0;
            for(header of menuHeaders) {
                resultMenus.push({
                    header: header.header,
                    menus: []});
                for(menu of menuArr) {
                    if(header.header == menu.header) {
                        resultMenus[counter].menus.push(menu);
                    }
                }
                counter++;
            }
            res.json(resultMenus);
        }catch(err) {
            res.status(err.status).json(err.message);
        }
    },

    async getMenuSubjects(req , res) {
        try {
            const subjectArr = await mongoRepository.getMenuSubjects();
            let uniqSubjectArr = []
            for(subject of subjectArr) {
                uniqSubjectArr.push(subject._id.subject)
            }
            const lowerSubjects = uniqSubjectArr.map(element => {
                return element.toLowerCase();
              });
            res.json(lowerSubjects.sort());
        }catch(err) {
            res.status(err.status).json(err.message);
        }
    }
}
