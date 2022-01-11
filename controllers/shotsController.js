const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Pet = require('../models/pet')
const Shot = require('../models/shots')

// INDEX
router.get('/:id/shots/show', async (req, res) => {
    const pet = await Pet.findById(req.params.id).populate('shots')
    console.log(pet)
    res.render('shots/show', { pet })
});


router.get('/:id/shots/new', async (req, res) => {
    const pet = await Pet.findById(req.params.id)
    res.render('shots/new', { pet })
})

// POST: To create a new data
// make sure to attach this post route to pet 
router.post('/:id/shots', async (req, res) => {
    const pet = await Pet.findById(req.params.id)
    const newShot = await new Shot(req.body)
    pet.shots.push(newShot)
    await newShot.save()
    await pet.save()
    res.redirect(`/pet/${pet._id}`)
})

// GET ~> /pet/:id/shots/:id / edit
router.get('/:petId/shots/:id/edit', async (req, res) => {
    const pet = await Pet.findById(req.params.petId)
    const shot = await Shot.findById(req.params.id)
    res.render('shots/edit', { pet })
})

// PUT ~> /shot/: id // I'm not sure if I need to give option to edit shot information...
// router.put('/:petId/shots/:id/', async (req, res, next) => {
//     const editShot = await Shot.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     res.redirect(`/shot/${editShot._id}`)
// })

// DELETE ~> /shot/: id
router.delete('/:petId/shots/:id/', async (req, res) => {
    const pet = await Pet.findById(req.params.petId)
    const deletedShot = await Shot.findByIdAndDelete(req.params.id)
    res.redirect(`/pet/${pet._id}/shots/show`)
})

//--------><--------//

module.exports = router