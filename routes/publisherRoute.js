const router = require('express').Router();
const Controller = require('../controllers/publisherController')

router.get('/', Controller.show)
router.get('/books/:id', Controller.books)

module.exports = router;