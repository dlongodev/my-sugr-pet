const express = require('express')
const router = express.Router()
const passport = require('passport');
const User = require('../models/user')
// const Pet = require('../models/pet')

// GET: Form for user to Register -----
router.get('/register', (req, res) => {
    res.render('users/register')
})

// POST: create user data
router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err)
            res.redirect('/pet/new')
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
})

// GET: Login form --------
router.get('/login', (req, res) => {
    res.render('users/login')
})

// POST: authenthicate login
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'welcome back!');
    res.redirect('/pet');
})

// GET: Passport Logout ---------
router.get('/logout', (req, res) => {
    req.logOut()
    req.flash('success', 'Logged Out!')
    res.redirect('/')
})

//--------><--------//

module.exports = router