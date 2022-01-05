const express = require('express')
const router = express.Router()
const User = require('../models/user')

// INDEX
router.get('/', (req, res) => {
    res.render('index')
})


//--------><--------//

module.exports = router