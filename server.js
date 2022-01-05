const express = require('express')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')

const userController = require('./controllers/userController')
// const petController = require('./controllers/petController')
// const insulinController = require('./controllers/insulinController')
// const sessionsController = require('./controllers/sessionsController')

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

// session middleware------------------
// app.use(session({
//     secret: SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
// }))

// app.use((req, res, next) => {
//     res.locals.username = req.session.username
//     res.locals.loggedIn = req.session.loggedIn
//     next()
// })

// // custom middleware for flash messaging
// app.use((req, res, next) => {
//     res.locals.message = req.session.message
//     req.session.message = ''
//     next()
// })


// pass this to any controller or route that you don't want to have accessible
// to users who are not logged in
// const authRequired = (req, res, next) => {
//     if (req.session.loggedIn) {
//         next()
//     } else {
//         res.redirect('/session/login')
//     }
// }

// session controllers------------------
app.use('/user', userController)
// app.use('/user', authRequired, userController)
// app.use('/pet', authRequired, petController)
// app.use('/insulin', authRequired, insulinController)
// app.use('/session', sessionsController)

// LISTENER //////////////////////////////////////////////////////////////
app.set('port', process.env.PORT || 8000);
console.log(`dotenv= ${process.env.PORT}`)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`);
});