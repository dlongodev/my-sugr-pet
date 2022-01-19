const { Schema } = require('mongoose')
const mongoose = require('../db/connection')
const Shot = require('./shots')

const PetSchema = new mongoose.Schema({
    petName: String,
    kind: String,
    breed: String,
    color: String,
    age: Date,
    photo: {
        url: String,
        filename: String
    },
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

PetSchema.virtual('squarePhoto').get(function () {
    return this.photo.url.replace('/upload', '/upload/w_500,ar_1:1,c_fill,g_auto')
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