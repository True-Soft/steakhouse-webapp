const router = require('express').Router();
const bodyparser = require('body-parser');
const menuController = require('../controllers/menuController');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const purchaseController = require('../controllers/purchaseController');

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: true }));

router
    //GET
    .get('/menu/subjects' , menuController.getMenuSubjects)
    .get('/menu/:subject' , menuController.getMenuBySubject)
    .get('/profile-info' , profileController.profileInfo)
    .get('/history' , purchaseController.history)
    //POST
    .post('/signup' , authController.signUp)
    .post('/login' , authController.login)
    .post('/buy' , purchaseController.buy)
    //PUT
    .put('/update-profile' , profileController.updateProfile)

module.exports = router;
