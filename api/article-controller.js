const Article = require('../models/article')
const Subject = require('../models/subject')

async function createArticle(req, res){
    const { author, title, text } = req.body
    const { subject } = req.params
    
    try{
        const subj = await Subject.findOne({ alias: subject })
        
        const article = new Article({ author, title, text, subject: subj._doc._id })
        const newDoc = await article.save()
        
        const { date } = newDoc._doc
        res.json({ status: 'ok', author, subject: subj._doc._id,  title, text, date})
    }
    catch(err){
        res.status(400).json({ status: '400', message: 'Couldn\'t create article'})
    }
}

async function getArticles(req, res){
    const { subject } = req.params

    try{
        const subj = await Subject.findOne({ alias: subject })
        const articles = await Article
            .find({ subject: subj._doc._id })
            .populate('author')
            .populate('subject')
            .exec()
        res.json(articles)
    }
    catch(err){
        res.status(400).json({ status: '400', message: 'Couldn\'t get articles' })
    }    
}

async function getArticle(req, res){
    const { title, subject } = req.params

    try{
        const subj = await Subject.findOne({ alias: subject })
        const article = await Article
            .findOne({ subject: subj._doc._id, title })
            .populate('author')
            .populate('subject')
            .exec()
        res.json({ status: 'ok', ...article._doc})
    }
    catch(err){
        res.status(404).json({ status: '404', message: 'Couldn\'t find article'})
    }
}

module.exports = {
    createArticle,
    getArticles,
    getArticle
}