const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    img: String,
    title: String,
    body: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref : "User"
    }
}, {timestamps : true});

const Articles = mongoose.model('Articles', articleSchema);
module.exports = Articles