const mongoose = require('../db/connection')

const PetSchema = new mongoose.Schema({
    petName: String,
    kind: String,
    breed: String,
    color: String,
    age: Number,
    shots: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shot'
        }
    ]
})

const Pet = mongoose.model('Pet', PetSchema)

module.exports = Pet