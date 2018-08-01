const User = require('../models/user')

async function createUser(req, res){
    const { username, password } = req.body

    const user = new User({ username, password })

    try{
        const newDoc = await user.save()
        const { level } = newDoc._doc
        res.json({ status: 'ok', username, _id, level})
    }
    catch(err){
        res.status(400).json({ status: '400', message: 'Couldn\'t create user'})
    }
}

async function getUser(req, res){
    const userId = req.params.userId

    try{
        const user = await User.findOne({ _id: userId })
        const { username, level } = user._doc
        res.json({ status: 'ok', username, level})
    }
    catch(err){
        res.status(404).json({ status: '404', message: 'User not found' })
    }
}

const createAuthenticateUser = ({ jwt, jwtOptions }) => async (req, res) => {
    const { username, password } = req.body

    try{
        const user = await User.findOne({ username })
        const isMatch = await user.comparePassword(password)

        if(isMatch){
            const payload = { is: user._id }
            const token = jwt.sign(payload, jwtOptions.secretOrKey)
            return res.json({ message: 'ok', token, username })
        }
        else{
            return res.status(404).json({ status: '404', message: 'User not found' })
        }
    }
    catch(err){
         res.status(401).json({ message: 'no such user found '})
    }
}

module.exports = {
    createUser,
    getUser,
    createAuthenticateUser
}