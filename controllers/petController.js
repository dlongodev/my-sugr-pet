const express = require('express')
const router = express.Router()
const Pet = require('../models/pet')

// INDEX
// router.get('/', (req, res) => {
//     res.render('index')
// })


router.get('/', (req, res, next) => {
    Pet.find({})
        .populate('owner')
        .then(pet => res.json(pet))
        .catch(next)
});

// SHOW: Get a specific item by it's ID
router.get('/:id', (req, res, next) => {
    Pet.findById(req.params.id)
        .populate('owner')
        .then((pet) => res.json(pet))
        .catch(next)
})

// POST: To create a new data
router.post('/', (req, res, next) => {
    Pet.create(req.body)
        .then(pet => res.json(pet))
        .catch(next)
})

// GET ~> /pet/: id / edit
router.get('/:id/edit', (req, res, next) => {
    Pet.findById(req.params.id)
        .then(pet => res.json(pet))
        .catch(next)
})

// PUT ~> /pet/: id
router.put('/:id', (req, res, next) => {
    Pet.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(pet => res.json(pet))
        .catch(next)
})

// DELETE ~> /pet/: id
router.delete('/:id', (req, res, next) => {
    Pet.findByIdAndDelete(req.params.id)
        .then(() => res.json({
            message: "DELETED WORKED"
        }))
        .catch(next)
})

//--------><--------//

module.exports = router