const mongoose = require('mongoose');
const User = require("./user");

// comment schema
const CommentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: User,
    },
    content: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        require: true
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  User,
        require: true
    }
})
// Post Schema 
const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        require: true
    },
    content: {
        type:String,
        required: true
    },
    media: {
        type: String,
        require: false
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    comments: [CommentSchema],
    createdAt: {
        type:Date,
        require: true
    },
    updatedAt: {
        type: Date,
        require: true
    },
    isEdited: {
        type: Boolean,
        default: false
    },
    reposts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    sharedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        require: false
    },
    hashtags: [{
        type:String,
    }],
    mentions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }]
});

module.exports = mongoose.model("Post", PostSchema);