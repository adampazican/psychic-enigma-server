const mongoose = require('mongoose')
require('mongoose-type-url')
const Schema = mongoose.Schema

const subjectSchema = new Schema({
    name: { type: String, required: true },
    alias: { type: String, required: true },
    image: Schema.Types.Url
})

module.exports = mongoose.model('Subject', subjectSchema)