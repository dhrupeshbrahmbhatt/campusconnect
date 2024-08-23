const mongoose = require("mongoose");
const User_Schema = new mongoose.Schema(
    {
        // name: {
        //     type: String,
        //     require: true,
        //     trim: true,
        // },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        // phoneNumber: {
        //     type: String,
        //     trim: true,
        //     match: ['/^\d{10}$/', 'Please provide a valid 10-digit phone number'],
        // },
        // dateOfBirth: {
        //     type: Date,
        // },
        // aluminiStatus: {
        //     type: Boolean,
        //     default: false,
        // },
    }
)

const User = mongoose.model("CamConect_Users", User_Schema);
module.exports = User;