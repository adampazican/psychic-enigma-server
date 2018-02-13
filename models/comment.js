const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    article: {
        type: mongoose.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    date: {type: Date, default: Date.now },
    text: { type: String, required: true }
})

module.exports = mongoose.model('Comment', commentSchema)