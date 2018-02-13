const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    level: { type: Number, default: 0 }
})

userSchema.pre('save', function(next) {
    if(!this.isModified('password')) return next()
    
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if(err) return next(err)

        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) return next(err)

            this.password = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if(err) return callback(err)
        callback(null, isMatch)
    })
}

module.exports = mongoose.model('User', userSchema)