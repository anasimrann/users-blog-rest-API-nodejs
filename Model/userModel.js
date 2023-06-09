const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    blogs:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Blog",
            required:true
        }
    ]
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;