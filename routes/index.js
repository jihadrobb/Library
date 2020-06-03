const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('This is index page');
})

module.exports = router;