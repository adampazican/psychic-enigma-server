const Subject = require('../models/subject')

function getSubjects(req, res){
    Subject.find().then(result => res.json(result))
    //Subject.find((err, result) => res.json(result))
}

function createSubject(req, res){
    const name = req.body.name
    const image = req.body.image

    const subject = new Subject({
        name,
        image
    })

    subject.save().then(newDoc =>
        res.json({ status: "ok", ...newDoc._doc})    
    )
}

function updateSubject(req, res){
    const _id = req.params.subjectId
    const name = req.body.name
    const image = req.body.image

    Subject.findOne({ _id })
        .then(doc => {
            doc.name = name || doc.name
            doc.image = image || doc.image
            doc.save().then(newDoc => 
                res.json({ status: "ok", ...newDoc._doc })
            )
        })
}

function removeSubject(req, res){
    const _id = req.params.subjectId
    
    Subject.remove({ _id }).then(_ => res.json({ status: "ok" }))
}


module.exports = {
    getSubjects,
    createSubject,
    updateSubject,
    removeSubject
}