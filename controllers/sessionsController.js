const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Session controller works')
})

router.get('/register', (req, res) => {
    res.render('sessions/register')
})

router.post('/register', async (req, res, next) => {
    try {
        if (req.body.password === req.body.verifyPassword) {
            // passwords must match
            const desiredEmail = req.body.email
            const userExists = await User.findOne({ email: desiredEmail })
            if (userExists) {
                req.session.message = 'email already exists'
                res.redirect('/session/register')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                req.body.password = hashedPassword
                const createdUser = await User.create(req.body)
                req.session.email = createdUser.email
                req.session.loggedIn = true
                res.redirect('/pet/new')
            }
        } else {
            req.session.message = 'Passwords must match'
            res.redirect('/session/register')
        }
    } catch (err) {
        next(err)
    }
})

router.get('/login', (req, res) => {
    res.render('sessions/login')
})

router.post('/login', async (req, res, next) => {
    try {
        const userToLogin = await User.findOne({ email: req.body.email })
        if (userToLogin) {
            const validPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if (validPassword) {
                req.session.email = userToLogin.email
                req.session.loggedIn = true
                res.redirect('/pet')
            } else {
                req.session.message = 'Invalid email or Password'
                res.redirect('/session/login')
            }
        } else {
            res.redirect('/session/login')
        }
    } catch (err) {
        next(err)
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/session/login')
})


module.exports = router