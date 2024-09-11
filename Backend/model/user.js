const mongoose = require("mongoose");
const User_Schema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,
            trim: true,
        },
        lastName: {
            type: String,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        phoneNumber: {
            type: Number,
            require: true,
            trim: true
        },
        Status: {
            type: String,
            require: true,
        },
        university: {
            type: String,
            require: true,
        },
        profileImg: {
            type: String,
            require: true
        }
    } 
)

const User = mongoose.model("CamConect_Users", User_Schema);
module.exports = User;