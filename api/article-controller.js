const Article = require('../models/article')
const Subject = require('../models/subject')

async function createArticle(req, res){
    const { author, title, text } = req.body
    const { subject } = req.params
    
    try{
        const subj = await Subject.findOne({ name: subject })
        
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
        const subj = await Subject.findOne({ name: subject })
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

module.exports = {
    createArticle,
    getArticles
}