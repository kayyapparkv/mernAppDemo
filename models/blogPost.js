const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema ({
    "DATE ": Date,
    FAT: {type: Number, default:0},
    "MILK PRICE":{type:Number, default:0},
    "MILK PRODUCTION ": {type:Number, default:0},
    SNF: {type:Number, default:0},
    "CREATED_AT": {type:Date, default:Date.now()}
});

//Model
const BlogPost = mongoose.model('CattleData', BlogPostSchema);

module.exports = BlogPost;