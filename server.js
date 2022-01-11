const express = require('express')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')

const userController = require('./controllers/userController')
const petController = require('./controllers/petController')
const shotsController = require('./controllers/shotsController')

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

// rendering home page------------------
app.get('/', (req, res) => {
     res.render('index')
    })

// models controllers------------------
app.use('/user', userController)
app.use('/pet', petController)
app.use('/pet', shotsController)


// LISTENER //////////////////////////////////////////////////////////////
app.set('port', process.env.PORT || 8000);
console.log(`dotenv= ${process.env.PORT}`)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`);
});