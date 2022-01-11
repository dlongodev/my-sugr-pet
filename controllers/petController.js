const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Pet = require('../models/pet')
const { isLoggedIn } = require('../middleware')

// INDEX
router.get('/', isLoggedIn, async (req, res) => {
    const pets = await Pet.find({})
    res.render('pets/index', { pets })
});

// GET: first get form to create pet
router.get('/new', isLoggedIn, async (req, res) => {
    res.render('pets/new')
})

// SHOW: Get a specific item by it's ID
router.get('/:id', isLoggedIn, async (req, res) => {
    const pet = await Pet.findById(req.params.id)
        .populate('shots')
        res.render('pets/show', {pet})
})
// POST: To create a new data
router.post('/', isLoggedIn, async (req, res) => {
    const newPet = await new Pet(req.body)
    // currentUser.pets.push(newPet)
    await newPet.save()
    // await currentUser.save()
    res.redirect(`/pet/${newPet._id}`)
})

// GET ~> /pet/: id / edit
router.get('/:id/edit', isLoggedIn, async (req, res) => {
    const pet = await Pet.findById(req.params.id)
    res.render('pets/edit', { pet })
})

// PUT ~> /pet/: id
router.put('/:id', isLoggedIn, async (req, res, next) => {
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