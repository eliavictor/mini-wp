const { decoded } = require('../helpers/jwt')
const Article = require('../models/article')

class ArticleController {
    static list(req, res, next) {
        Article.find({})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static create(req, res, next) {
        let token = decoded(req.headers.token)
        let obj = {
            img: req.file.cloudStoragePublicUrl,
            title: req.body.title,
            body: req.body.body,
            userId: token.id
        }
        Article.create(obj)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findOne(req, res, next) {
        Article.findOne({_id : req.params.id})
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(next)
    }

    static update(req, res, next) {
        let obj = {
            title: req.body.title,
            body: req.body.body,
            img: req.body.img
        }
        Article.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                // console.log(obj, 'ini OBJ')
                data.set(obj)
                // console.log(data, 'ini Data')
                return data.save()
            }
        }) 
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static delete(req, res, next) {
        Article.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data) res.status(404).json({ message: 'Not Found' })
                else res.status(200).json(req.params.id)
        }) 
        .catch(next)
    }
}
module.exports = ArticleController