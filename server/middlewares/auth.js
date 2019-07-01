const jwt = require('../helpers/jwt')
const User = require('../../../mini-wp/server/models/user')
const Article = require('../../../mini-wp/server/models/article')

module.exports = {
  Authentication(req, res, next) {
    if (req.headers.hasOwnProperty('token')) {
        req.decoded = jwt.decoded(req.headers.token)
        User.findOne({ username: req.decoded.username })
        .then(data => {
            if (!data) {
                throw {status: 404, message: "username not found"}
            } else {
                next()
            }
        })
        .catch(next)
    } else {
        throw {status: 403, message: "Forbidden page"}
    }
  },
  Authorization(req, res, next){
    let decodeToken = jwt.decoded(req.headers.token)
    Article.findById(req.params.id)    
    .then((gotData)=>{
        if(gotData){
            if(gotData.userId == decodeToken.id){
                next()
            } else {
                throw {code : 401, message : "Unauthorized"}
            }
        } else {
        }
    })
    .catch(next)
}  
} 