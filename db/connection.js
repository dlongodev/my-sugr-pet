require('dotenv').config()
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI
const DB_URL = process.env.DB_URL || MONGODB_URI

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((instance) =>
        console.log(`Connected to db: ${instance.connections[0].name}`)
    )
    .catch((error) => console.log('Connection failed!', error))

module.exports = mongoose;