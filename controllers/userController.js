const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Pet = require('../models/pet')

// INDEX

router.get('/', (req, res, next) => {
    User.find({})
        .then(users => res.json(users))
        .catch(next)
});

// SHOW: Get a specific item by it's ID
router.get('/:id', async (req, res, next) => {
        // const user = await User.findById(req.params.id)
        // res.render('user/show')
    User.findById(req.params.id)
        .then((user) => res.json(user))
        .catch(next)
})

// POST: To create a new data
router.post('/', (req, res, next) => {
    // console.log(req.body)
    User.create(req.body)
        .then(user => res.json(user))
        .catch(next)
})

// GET ~> /users/: id / edit
router.get('/:id/edit', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(next)
})

// PUT ~> /users/: id
router.put('/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(next)
})

// DELETE ~> /users/: id
router.delete('/:id', (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json({
            message: "DELETED WORKED"
        }))
        .catch(next)
})

//--------><--------//

module.exports = router