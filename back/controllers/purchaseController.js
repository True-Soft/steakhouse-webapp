const { currentDate } = require('../middleware/middleware');
const mongoRepository = require('../repositories/mongoRepository');
const { jwtVerify } = require('../middleware/middleware');
const { use } = require('../routers/entityRouter');

module.exports = {
    async buy(req , res) {
        try {
            const token = req.header('authorization');
            if(!token) {
                //If user non authrorized, skip buy option
                res.json("OK");
                return;
            }
            const user = jwtVerify(token);
            const purchase = req.body.purchase;
            for(const item of purchase) {
                item.email = user.email;
                item.date = new Date().toDateString();
            }
            await mongoRepository.addPurchase(purchase);
            let points = 0;
            if(req.body.points) {
                points = req.body.points;
                const profile = await mongoRepository.findUser(user);
                //TODO points score
            }
            
            res.json("OK");
        } catch(err) {
            res.status(err.status).json(err.message);
        }
    },
    
    async history(req , res) {
        try {
            const token = req.header('authorization');
            if(!token) {
                const err = "Bad request";
                throw new badRequestError(err);
            }
            const user = jwtVerify(token);
            const purchase = await mongoRepository.getPurchase(user.email);
            let history = [];
            for(const item of purchase) {
                const menuInfo = await mongoRepository.getMenuById(item._id.menuId);
                history.push({
                    amount: item.amount,
                    title: menuInfo.title,
                    date: item._id.date,
                    price: menuInfo.price*item.amount,
                })
            }
            res.json(history);
        } catch(err) {
            console.log(err)
            res.status(err.status).json(err.message);
        }
    }
}
