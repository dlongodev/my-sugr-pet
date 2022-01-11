const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Pet = require('../models/pet')

// INDEX
router.get('/', async (req, res) => {
    const pets = await Pet.find({})
    res.render('pets/index', { pets })
});

// GET: first get form to create pet
router.get('/new', async (req, res) => {
    res.render('pets/new')
})

// SHOW: Get a specific item by it's ID
router.get('/:id', async (req, res) => {
    const pet = await Pet.findById(req.params.id)
        .populate('shots')
        res.render('pets/show', {pet})
})
// POST: To create a new data
router.post('/', async (req, res) => {
    const newPet = await new Pet(req.body)
    // currentUser.pets.push(newPet)
    await newPet.save()
    // await currentUser.save()
    res.redirect(`/pet/${newPet._id}`)
})

// GET ~> /pet/: id / edit
router.get('/:id/edit', async (req, res) => {
    const pet = await Pet.findById(req.params.id)
    res.render('pets/edit', { pet })
})

// PUT ~> /pet/: id
router.put('/:id', async (req, res, next) => {
    const editPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true })
    req.flash('success', 'Successfully updated your pet information!')
    res.redirect(`/pet/${editPet._id}`)
})

// DELETE ~> /pet/: id
router.delete('/:id', async (req, res) => {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id)
    res.redirect('/pet')
})

//--------><--------//

module.exports = router