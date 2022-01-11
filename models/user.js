const mongoose = require('../db/connection')
const passportLocalMongoose = require('passport-local-mongoose')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.plugin(passportLocalMongoose)

// DELETE ALL ASSOCIATED PETS AFTER A USER IS DELETED
// userSchema.post('findOneAndDelete', async function (user) {
//     if (user.pets.length) {
//         const res = await Pet.deleteMany({ _id: { $in: user.pets } })
//         console.log(res);
//     }
// })

const User = mongoose.model('User', userSchema)
module.exports = User