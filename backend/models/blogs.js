const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    subject: {
        type : String,
        required : true,
    },
    content: {
        type: String,
        required : true,
    }

} , {timestamps: true});
const BLOG = mongoose.model('blogs' , blogSchema)

module.exports = BLOG