const mongoose = require('./connection')
const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Pet = require('../models/pet')
const Shot = require('../models/shots')
const shotSeeds = require('../db/shotSeeds.json')
const petSeeds = require('../db/petSeeds.json')
const salt = bcrypt.genSaltSync(10)


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
        const hashedPassword = bcrypt.hashSync('123', salt)
        return User.create({ name: 'Joe', email: 'fake@email.com', password: hashedPassword})
            .then(user => {
                return petSeeds.map((pet) => ({ ...pet, owner: user._id }))
            })
            .then(pet => {
                return Pet.insertMany(pet)
            })
            .then(pet => {
                return shotSeeds.map((shots) => ({ ...shots, owner: pet[0]._id }))
            }).then(shots => {
                return Shot.insertMany(shots)
            })
    })
    .then(data => console.log(data))
    .catch(err => console.error(err))
    .finally(() => {
        process.exit()
    })