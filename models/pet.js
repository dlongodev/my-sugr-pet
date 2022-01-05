const mongoose = require('../db/connection')

const PetSchema = new mongoose.Schema({
    name: String,
    kind: String,
    breed: String,
    color: String,
    age: Number,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Pet = mongoose.model('Pet', PetSchema)

module.exports = Pet