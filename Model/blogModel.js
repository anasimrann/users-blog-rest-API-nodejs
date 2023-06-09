const mongoose = require("mongoose");
const { Schema } = mongoose;


const blogSchema = Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true
    }
}, {
    timestamps: true
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;