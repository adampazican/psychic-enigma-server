const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    level: { type: Number, default: 0 }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()

    try{
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash
        next()
    }
    catch(err){
        next(err)
    }
})

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)