const mongoose = require('../db/connection')

const InsulinSchema = new mongoose.Schema({
    date: Date,
    time: String,
    dosage: Number,
    // injectionSite: {
    //     frontRight: Boolean,
    //     frontLeft: Boolean,
    //     backRight: Boolean,
    //     backLeft: Boolean
    // }
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }
})