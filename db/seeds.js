const mongoose = require('./connection')
const express = require('express')
const User = require('../models/user')
const Pet = require('../models/pet')
const Shot = require('../models/shots')
const shotSeeds = require('../db/shotSeeds.json')
const petSeeds = require('../db/petSeeds.json')


User.deleteMany({})
    .then(() => {
        return User.deleteMany({})
    })
    .then(() => {
        return Pet.deleteMany({})
    })
    .then(() => {
        return Shot.deleteMany({})
    })
    .then(() => {
        const user = new User({ email: 'fake@email.com', username: 'Joe' })
        return User.register(user, '123')
            .then(user => {
                return petSeeds.map((pet) => ({ ...pet, owner: user._id }))
            })
            .then(pet => {
                return Pet.insertMany(pet)
            })
            .then(pet => {
                return shotSeeds.map((shots) => ({ ...pet, shots: pet[0]._id }))
            }).then(shots => {
                return Shot.insertMany(shots)
            })
    })
    .then(data => console.log(data))
    .catch(err => console.error(err))
    .finally(() => {
        process.exit()
    })