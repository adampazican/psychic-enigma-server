const express = require('express')
const subjectsController = require('./subjects-controller')

const router = express.Router()

router.get('/subjects', subjectsController.getSubjects)
router.post('/subjects/new', subjectsController.createSubject)
router.put('/subjects/:subjectId', subjectsController.updateSubject)
router.delete('/subjects/:subjectId', subjectsController.removeSubject)

module.exports = router