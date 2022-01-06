const mongoose = require('../db/connection')

const ShotSchema = new mongoose.Schema({
    date: String,
    time: String,
    dosage: Number,
    injectionSite: { type: String, possibleValues: ['front right', 'front left', 'back right', 'back left'] },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }
})

const Shot = mongoose.model('Shots', ShotSchema)

module.exports = Shot