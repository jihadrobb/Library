const router = require('express').Router();
const bookRoute = require('./bookRoute')
const authorRoute = require('./authorRoute')
const publisherRoute = require('./publisherRoute')
const userRoute = require('./userRoute')

router.get('/', (req, res) => {
    res.render('home');
})

router.use('/books', bookRoute)
router.use('/authors', authorRoute)
router.use('/publishers', publisherRoute)
router.use('/users', userRoute)


module.exports = router;