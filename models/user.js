const mongoose = require('../db/connection')

const userSchema = new mongoose.Schema({
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
    // pets: [
    //     {type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Pet'}
    // ]

})

// DELETE ALL ASSOCIATED PETS AFTER A USER IS DELETED
// userSchema.post('findOneAndDelete', async function (user) {
//     if (user.pets.length) {
//         const res = await Pet.deleteMany({ _id: { $in: user.pets } })
//         console.log(res);
//     }
// })

const User = mongoose.model('User', userSchema)

module.exports = User