const mongoose = require('../db/connection')

const ShotSchema = new mongoose.Schema({
    date: String,
    time: String,
    dosage: Number,
    injectionSite: String
})

const Shot = mongoose.model('Shot', ShotSchema)

module.exports = Shot