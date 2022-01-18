if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const userController = require('./controllers/userController')
const petController = require('./controllers/petController')
const shotsController = require('./controllers/shotsController')

const expressEjsLoyouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

// CONFIGURATION //////////////////////////////////

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(expressEjsLoyouts)

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

const secret = process.env.SECRET || "thisisasessionsecretthatwillchange"

const sessionConfig = {
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
    }
}
app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// middlewares -------------------------
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
})

app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.currentUser = req.user
    next();
})

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in.')
        return res.redirect('/login')
    }
    next();
}

// rendering home page------------------
app.get('/', (req, res) => {
     res.render('index')
})

// models controllers------------------
app.use('/', userController)
app.use('/pet', petController)
app.use('/pet', shotsController)


// LISTENER /////////////////////////////////////
app.set('port', process.env.PORT || 3030);
console.log(`dotenv= ${process.env.PORT}`)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`);
});