const mongoose = require("mongoose");
const Post_Schema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Types.ObjectId,
            require:true,
        },
        title: {
            type: String,
            require: true
        },
        content: {
            type: String,
            require: true,
        },
    }
)

const Posts = mongoose.model('CamConnect_posts', Post_Schema);
module.exports = Posts