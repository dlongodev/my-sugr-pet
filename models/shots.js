const mongoose = require('../db/connection')

const ShotSchema = new mongoose.Schema({
    date: String,
    time: String,
    dosage: Number,
    injectionSite: {
        type: String,
        choices: ['front-right', 'front-left', 'back-right', 'back-left']
    },
    petOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }
})

const Shot = mongoose.model('Shots', ShotSchema)

module.exports = Shot