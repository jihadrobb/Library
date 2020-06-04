const router = require('express').Router();
const Controller = require('../controllers/userController')

router.get('/register', Controller.add);
router.post('/register', Controller.insert);

router.get('/login', Controller.loginForm);
router.post('/login', Controller.login);

router.get('/logout', Controller.logout)
function checkLogin(req, res, next){
    if(req.session.username){
        next();
    } else {
        res.send('Please login to continue');
    }
}
router.use(checkLogin);
router.get('/:username', Controller.showHistory);
router.get('/:username/:BookId', Controller.borrow);
router.get('/:username/:BookId/return', Controller.returnForm);
router.post('/:username/:BookId/return', Controller.return);


module.exports = router;