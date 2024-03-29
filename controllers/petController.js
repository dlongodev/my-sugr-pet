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
const moment = require('moment')

// PETS INDEX: showing all user's pet
router.get('/', isLoggedIn, async (req, res) => {
    const pets = await Pet.find({ owner: req.user._id }).populate('owner')
    // console.log("pets ~>", pets, "user session ~>", req.user._id)
    res.render('pets/index', { pets, moment })
});

// GET: to get the form to create pet
router.get('/new', isLoggedIn, async (req, res) => {
    res.render('pets/new')
})

// SHOW: Get a pet by it's ID
router.get('/:id', isLoggedIn, async (req, res) => {
    const pet = await Pet.findById(req.params.id)
        .populate('shots').populate('owner')
    let sortedDates = pet.shots.sort((first, second) => {
        let firstDate = first.date.getTime()
        let secondDate = second.date.getTime()
        return secondDate - firstDate
    })
    let latestShot = sortedDates[0]
    let petAgeCalculation = moment().diff(moment(pet.age), 'years');
    let petAge = petAgeCalculation < 1
        ? `${moment().diff(moment(pet.age), 'months')} months old`
        : petAgeCalculation >= 1 && petAgeCalculation < 2
            ? `${petAgeCalculation} year old`
            : `${petAgeCalculation} years old`

    res.render('pets/show', { pet, petAge, latestShot, moment })
})
// POST: To create a new pet
router.post('/', isLoggedIn, upload.single('photo'), async (req, res) => {
    const defaultCatImg = "https://res.cloudinary.com/dsey1wpxj/image/upload/v1662388316/MySugrPet/a1mwrvz9byyogunlnozv.png"
    const defaultDogImg = "https://res.cloudinary.com/dsey1wpxj/image/upload/v1662388316/MySugrPet/ftdfzqn1bjmfzrsvmffa.png"
    try {
        const newPet = new Pet(req.body)
        if (!!req.file) {
            newPet.photo.url = req.file.path
            newPet.photo.filename = req.file.filename
        } else {
            newPet.photo.url = req.body.kind === "cat" ? defaultCatImg : defaultDogImg
        }
        newPet.owner = req.user._id
        await newPet.save()
        res.redirect(`/pet/${newPet.id}`)
    } catch (error) {
        req.flash('error', error.message)
        res.redirect(`/pet/new`)
    }
})

// GET: to get form to edit pet info ~> /pet/:id/edit
router.get('/:id/edit', isLoggedIn, async (req, res) => {
    const pet = await Pet.findById(req.params.id)
    res.render('pets/edit', { pet })
})

// PUT: edit the data for the pet ~> /pet/:id
router.put('/:id', isLoggedIn, upload.single('photo'), async (req, res, next) => {
    try {
        const editPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!!req.file) {
            editPet.photo.url = req.file.path
            editPet.photo.filename = req.file.filename
            await editPet.save()
            console.log(editPet)
        }
        req.flash('success', 'Successfully updated your pet information!')
        res.redirect(`/pet`)
    } catch (error) {
        req.flash('error', error.message)
        res.redirect(`/pet/${req.params.id}/edit`)
    }
})

// DELETE: delete the pet from database and photo ~> /pet/:id
router.delete('/:id', async (req, res) => {
    const pet = await Pet.findById(req.params.id)
    if (!!pet.photo.filename) {
        await cloudinary.uploader.destroy(pet.photo.filename)
    }
    const deletedPet = await Pet.findByIdAndDelete(req.params.id)
    res.redirect('/pet')
})

//--------><--------//

module.exports = router