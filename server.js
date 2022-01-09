const express = require('express')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const SESSION_SECRET = process.env.SESSION_SECRET

const userController = require('./controllers/userController')
const petController = require('./controllers/petController')
const shotsController = require('./controllers/shotsController')
const sessionsController = require('./controllers/sessionsController')

const expressEjsLoyouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const session = require('express-session')

// CONFIGURATION //////////////////////////////////////////////////////////

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(expressEjsLoyouts)

app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

// session middleware------------------
app.use(session({
    secret: SESSION_SECRET,
    credentials: 'include',
    resave: false,
    saveUninitialized: false,
}))

app.use((req, res, next) => {
    res.locals.email = req.session.email
    res.locals.loggedIn = req.session.loggedIn
    next()
})

// custom middleware for flash messaging
app.use((req, res, next) => {
    res.locals.message = req.session.message
    req.session.message = ''
    next()
})


// pass this to any controller or route that you don't want to have accessible
// to users who are not logged in
const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/session/login')
    }
}

// session controllers------------------
app.use('/user', userController)
app.use('/pet', petController)
app.use('/shots', shotsController)
app.use('/session', sessionsController)

// LISTENER //////////////////////////////////////////////////////////////
app.set('port', process.env.PORT || 8000);
console.log(`dotenv= ${process.env.PORT}`)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`);
});