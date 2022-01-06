const express = require('express')
const router = express.Router()
const Shot = require('../models/shots')

// INDEX
// router.get('/', (req, res) => {
//     res.render('index')
// })


router.get('/', (req, res, next) => {
    Shot.find({})
        .populate('owner')
        .then(shots => res.json(shots))
        .catch(next)
});

// SHOW: Get a specific item by it's ID
router.get('/:id', (req, res, next) => {
    Shot.findById(req.params.id)
        .populate('owner')
        .then((shot) => res.json(shot))
        .catch(next)
})

// POST: To create a new data
router.post('/', (req, res, next) => {
    Shot.create(req.body)
        .then(shot => res.json(shot))
        .catch(next)
})

// GET ~> /shot/: id / edit
router.get('/:id/edit', (req, res, next) => {
    Shot.findById(req.params.id)
        .then(shot => res.json(shot))
        .catch(next)
})

// PUT ~> /shot/: id
router.put('/:id', (req, res, next) => {
    Shot.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(shot => res.json(shot))
        .catch(next)
})

// DELETE ~> /shot/: id
router.delete('/:id', (req, res, next) => {
    Shot.findByIdAndDelete(req.params.id)
        .then(() => res.json({
            message: "DELETED WORKED"
        }))
        .catch(next)
})

//--------><--------//

module.exports = router