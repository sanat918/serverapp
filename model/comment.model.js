let mongoose = require('mongoose')
const userModel = require('./user.model')

let commentSchema = new mongoose.Schema({

    text: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true 
    },
    replies: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
    ],
    date:
    {
        type: Date,
        default: Date.now
    }


}, { timestamps: true })

module.exports = mongoose.model("Comment", commentSchema)
