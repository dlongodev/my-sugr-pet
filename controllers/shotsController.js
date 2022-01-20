const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Pet = require('../models/pet')
const Shot = require('../models/shots')

// INDEX for shots history
router.get('/:id/shots/show', async (req, res) => {
    const pet = await Pet.findById(req.params.id).populate('shots')
    let sortedDates = pet.shots.sort((first, second) => {
        let firstDate = first.date.getTime()
        let secondDate = second.date.getTime()
        return secondDate - firstDate
    })
    res.render('shots/show', { pet, sortedDates })
});

// GET: form to create new shot
router.get('/:id/shots/new', async (req, res) => {
    const pet = await Pet.findById(req.params.id)
    res.render('shots/new', { pet, })
})

// POST: To create a new shot for based on pet id
router.post('/:id/shots', async (req, res) => {
    const pet = await Pet.findById(req.params.id)
    const newShot = await new Shot(req.body)
    pet.shots.push(newShot)
    await newShot.save()
    await pet.save()
    req.flash('success', 'You successfully tracked a new insulin injection!')
    res.redirect(`/pet/${pet._id}/shots/show`)
})

// GET: for editing shots ~> (not sure if needed yet)
// router.get('/:petId/shots/:id/edit', async (req, res) => {
//     const pet = await Pet.findById(req.params.petId).populate('shots')
//     const shot = await Shot.findById(req.params.id)
//     res.render('shots/edit', { pet, shot })
// })

// PUT: for updating shot data ~> (not sure if needed yet)
// router.put('/:petId/shots/:id/', async (req, res, next) => {
//     const pet = await Pet.findById(req.params.petId)
//     const editShot = await Shot.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     res.redirect(`/pet/${pet._id}/shots/show`)
// })

// DELETE ~> /shot/: id
router.delete('/:id/shots/:shotId/', async (req, res) => {
    const { id, shotId } = req.params
    await Pet.findByIdAndUpdate(id, { $pull: { shots: shotId } })
    const deletedShot = await Shot.findByIdAndDelete(shotId)
    req.flash('success', 'Successfully deleted an injection entry!')
    res.redirect(`/pet/${id}/shots/show`)
})

//--------><--------//

module.exports = router