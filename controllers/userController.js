const express = require('express')
const router = express.Router()
const User = require('../models/user')

// INDEX
router.get('/', (req, res) => {
    res.render('index')
})


router.get('/', (req, res, next) => {
    User.find({})
        .then(users => res.json(users))
        .catch(next)
});

//--------><--------//

module.exports = router