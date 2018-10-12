const User = require('../models/user')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportJWT = require('passport-jwt')

const ExtractJWT = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme('jwt')
jwtOptions.secretOrKey = process.env.JWT_SECRET

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    console.log('jwt payload', jwt_payload)

    User.findOne({ _id: jwt_payload.id }, (err, user) => {
        if(!user) return next(null, false, { message: 'User not found' })
        else if(err) return next(err)
        next(null, user)
    })
})

passport.use(strategy)

module.exports = { passport, jwt, jwtOptions }