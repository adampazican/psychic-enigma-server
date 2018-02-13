const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    date: {type: Date, default: Date.now },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { type: String, required: true },
    text: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

module.exports = mongoose.model('Article', articleSchema)