const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Pet = require('../models/pet')
const { isLoggedIn } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary')
const { deleteMany } = require('../models/user')
const upload = multer({ storage: storage })
const { cloudinary } = require('../cloudinary')


// PETS INDEX: showing all user's pet
router.get('/', isLoggedIn, async (req, res) => {
    const pets = await Pet.find({ owner: req.user._id }).populate('owner')
    // console.log("pets ~>", pets, "user session ~>", req.user._id)
    res.render('pets/index', { pets })
});

// GET: to get the form to create pet
router.get('/new', isLoggedIn, async (req, res) => {
    res.render('pets/new')
})

// SHOW: Get a pet by it's ID
router.get('/:id', isLoggedIn, async (req, res) => {
    const pet = await Pet.findById(req.params.id)
        .populate('shots').populate('owner')
    let today = Date.now()
    let petDOB = pet.age.valueOf()
    let petAge = Math.floor((today - petDOB) / 31556952000)
    res.render('pets/show', { pet, petAge })
})
// POST: To create a new pet
router.post('/', isLoggedIn, upload.single('photo'), async (req, res) => {
    const newPet = new Pet(req.body)
    newPet.photo.url = req.file.path
    newPet.photo.filename = req.file.filename
    newPet.owner = req.user._id
    await newPet.save()
    res.redirect(`/pet/${newPet.id}`)
})

// GET: to get form to edit pet info ~> /pet/:id/edit
router.get('/:id/edit', isLoggedIn, async (req, res) => {
    const pet = await Pet.findById(req.params.id)
    res.render('pets/edit', { pet })
})

// PUT: edit the data for the pet ~> /pet/:id
router.put('/:id', isLoggedIn, upload.single('photo'), async (req, res, next) => {
    const editPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true })
    editPet.photo.url = req.file.path
    editPet.photo.filename = req.file.filename
    await editPet.save()
    req.flash('success', 'Successfully updated your pet information!')
    res.redirect(`/pet/${editPet._id}`)
})

// DELETE: delete the pet from database ~> /pet/: id
router.delete('/:id', async (req, res) => {
    const pet = await Pet.findById(req.params.id)
    await cloudinary.uploader.destroy(pet.photo.filename)
    const deletedPet = await Pet.findByIdAndDelete(req.params.id)
    res.redirect('/pet')
})

//--------><--------//

module.exports = router