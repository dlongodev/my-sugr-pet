const mongoose = require('./connection')
const User = require('../models/user')
const Pet = require('../models/pet')
const Insulin = require('../models/insulin')
const dataSeeds = require('../db/seeds.json')

Bookmark.deleteMany({})
    .then(() => {
        return User.deleteMany({})
    })
    .then(() => {
        return User.create({ name: 'Daniele', email: 'email@email.com' })
            .then(user => {
                return dataSeeds.map((data) => ({ ...data, owner: user._id }))
            })
            .then(data => {
                return Bookmark.insertMany(data)
            })
    })
    .then(data => console.log(data))
    .catch(err => console.error(err))
    .finally(() => {
        process.exit()
    })