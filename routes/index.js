const router = require('express').Router();
const bookRoute = require('./bookRoute')
const authorRoute = require('./authorRoute')
const publisherRoute = require('./publisherRoute')

router.get('/', (req, res) => {
    res.render('home');
})
router.use('/books', bookRoute)
router.use('/authors', authorRoute)
router.use('/publishers', publisherRoute)

module.exports = router;