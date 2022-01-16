const { Schema } = require('mongoose')
const mongoose = require('../db/connection')
const Shot = require('./shots')

const PetSchema = new mongoose.Schema({
    petName: String,
    kind: String,
    breed: String,
    color: String,
    age: Date,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    shots: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shot'
        }
    ]
})

PetSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Shot.deleteMany({
            _id: {
                $in: doc.shots
            }
        })
    }
})

const Pet = mongoose.model('Pet', PetSchema)

module.exports = Pet