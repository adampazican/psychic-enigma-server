const User = require('../models/user')

function createUser(req, res){
    const username = req.body.username
    const password = req.body.password

    const user = new User({ username, password })

    user.save().then(newDoc =>
        res.json({ status: 'ok', ...newDoc._doc})
    )
}

function getUser(req, res){
    const userId = req.params.userId

    User.findOne({ _id: userId }).then(user => {
        const { username, level } = user._doc
        res.json({ status: 'ok', username, level})
    })
}

const createAuthenticateUser = ({jwt, jwtOptions}) => (req, res) => {
    const { username, password } = req.body

    User.findOne({ username }, (err, user) => {
        if(err || !user) {
            console.log(err)
            return res.status(401).json({ message: 'no such user found '})
        }
        user.comparePassword(password, (err, isMatch) => {
            if(isMatch) {
                const payload = { id: user._id }
                const token = jwt.sign(payload, jwtOptions.secretOrKey)
                res.json({ message: 'ok', token, username })
            }
        })
    })
}

module.exports = {
    createUser,
    getUser,
    createAuthenticateUser
}