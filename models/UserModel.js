const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true,"Please add the User Name"]
        },
        email: {
            type: String,
            required: [true,"Please add the User Email Address"],
            unique: [true,"Email address already Exist."]
        },
        password: {
            type: String,
            required: [true,"Please add the User Password"],
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User",userSchema);