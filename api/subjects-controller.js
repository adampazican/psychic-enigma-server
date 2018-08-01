const Subject = require('../models/subject')

async function getSubjects(req, res){
    try{
        const subjects = await Subject.find()
        res.json(subjects)
    }
    catch(err){
        res.status(400).json({ status: '400', message: 'Couldn\'t get articles'})
    }
}

async function createSubject(req, res){
    const { name, image } = req.body

    const subject = new Subject({
        name,
        image
    })

    try{
        const newDoc = await subject.save()
        res.json({ status: "ok", ...newDoc._doc})    
    }
    catch(err){
        res.status(400).json({ status: '400', message: 'Couldn\'t create articles'})
    }
}

async function updateSubject(req, res){
    const _id = req.params.subjectId
    const { name, image } = req.body

    try{
        const subject = await Subject.findOne({ _id })
        subject.name = name || subject.name
        subject.image = image || subject.image
        
        const newDoc = await subject.save()
        res.json({ status: "ok", ...newDoc._doc })
    }
    catch(err){
        res.status(400).json({ status: '400', message: 'Couldn\'t update articles'})
    }
}

async function removeSubject(req, res){
    const _id = req.params.subjectId
    
    try{
        await Subject.remove({ _id })
        res.json({ status: "ok" })
    }
    catch(err){
        res.status(400).json({ status: '400', message: 'Couldn\'t remove articles'})
    }
}


module.exports = {
    getSubjects,
    createSubject,
    updateSubject,
    removeSubject
}