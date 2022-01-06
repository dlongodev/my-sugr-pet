const mongoose = require('../db/connection')

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        // unique: true,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    // userPhoto: String
})

const User = mongoose.model('User', UserSchema)

module.exports = User