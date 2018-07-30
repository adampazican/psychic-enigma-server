const express = require('express')
const subjectsController = require('./subjects-controller')
const usersController = require('./users-controller')

const createRouter = ({passport, jwt, jwtOptions}) => {
    const router = express.Router()

    router.get('/subjects', subjectsController.getSubjects)
    router.post('/subjects', subjectsController.createSubject)
    router.put('/subjects/:subjectId', subjectsController.updateSubject)
    router.delete('/subjects/:subjectId', subjectsController.removeSubject)

    router.get('/users/:userId', usersController.getUser)
    router.post('/users', usersController.createUser)
    router.post('/user/login', usersController.createAuthenticateUser({ jwt, jwtOptions}))

    return router
}

module.exports = createRouter