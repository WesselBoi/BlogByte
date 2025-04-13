const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    subject: {
        type : String,
        required : true,
    },
    content: {
        type: String,
        required : true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }

} , {timestamps: true});
const BLOG = mongoose.model('blogs' , blogSchema)

module.exports = BLOG