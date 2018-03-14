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

module.exports = {
    createUser,
    getUser
}