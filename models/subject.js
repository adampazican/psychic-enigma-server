const mongoose = require('mongoose')
require('mongoose-type-url')
const Schema = mongoose.Schema

const subjectSchema = new Schema({
    name: { type: String, required: true },
    articles: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    },
    image: Schema.Types.Url
})

module.exports = mongoose.model('Subject', subjectSchema)