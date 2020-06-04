const router = require('express').Router();
const Controller = require('../controllers/bookController')

router.get('/', Controller.show)

function checkAdmin(req, res, next){
    if(req.session.admin){
        next();
    } else {
        res.send('Unauthorized');
    }
}

router.use(checkAdmin);
router.get('/add', Controller.add)
router.post('/add', Controller.insert)
router.get('/edit/:id', Controller.edit)
router.post('/edit/:id', Controller.update)
router.get('/delete/:id', Controller.delete)

module.exports = router;