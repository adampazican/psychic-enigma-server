const mongoose = require('mongoose')

const mongoDB = process.env.DB_HOST

mongoose.connect(mongoDB, { useNewUrlParser: true })

mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = db