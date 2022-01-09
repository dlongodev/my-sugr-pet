const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Pet = require('../models/pet')

// INDEX
// router.get('/', (req, res) => {
//     res.render('index')
// })

//find onwer by id (whos logidin)
// create pet req.body - association I have will create pet

router.get('/', async (req, res) => {
    const user = req.session.user
    console.log(user)
    const pets = await Pet.find({}).populate('owner')
    res.render('pets/index', {pets})
    // Pet.find({})
    //     .populate('owner')
    //     .then(pet => res.json(pet))
    //     .catch(next)
});

// GET: first get form to create pet
router.get('/new', (req, res) => {
    res.render('pets/new')
})

// SHOW: Get a specific item by it's ID
router.get('/:id', async (req, res) => {
    const pet = await Pet.findById(req.params.id)
        .populate('owner')
        res.render('pets/show', {pet})
})
// POST: To create a new data
router.post('/', async (req, res) => {
    let currentUser = await User.findById(req.session.loggedIn)
    if (req.body.kind.cat === 'on') {
        req.body.kind.cat = true
    } else if (req.body.kind.dog === 'on') {
        req.body.kind.dog = true
    } else {
        req.body.kind.cat = false
    }
    console.log(req.body.kind)
    console.log(currentUser)
    res.send(req.body)
    // const newPet = new Pet(req.body)
    // await newPet.save()
    // res.redirect(`/pet/${newPet._id}`)
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