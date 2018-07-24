const express = require('express')
const bodyParser = require('body-parser')
const createApiRouter = require('./api/routes')
const db = require('./db')
const User = require('./models/user')

const authentication = require('./authentication/')
const passport = authentication.passport
const jwt = authentication.jwt
const jwtOptions = authentication.jwtOptions

const app = express()

app.use(passport.initialize())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


app.get('/new-user', (req, res) => {
    const user = new User({ username: 'zvlh', password: 'pass', level: -1 })
    user.save(err => {
        if(err){ res.send('err')
            console.log(err)
        }
        else res.send('ok')
    })
})

app.post('/login', (req, res) => {
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
})

app.get('/secret', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({message:'successful secret revealed', id: req.user.id, username: req.user.username})
})


app.get('/', (req, res) => res.send('Hello'))
app.use('/api', createApiRouter({ passport, jwt}))

app.listen(4000, () => console.log('app listening'))