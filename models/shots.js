const mongoose = require('../db/connection')

const ShotSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    dosage: { type: Number, min: 1, max: 7 },
    injectionSite: { type: String, required: true }
})

const Shot = mongoose.model('Shot', ShotSchema)

module.exports = Shot