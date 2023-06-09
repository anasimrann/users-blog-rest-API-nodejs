const { default: mongoose } = require("mongoose");
const Blog = require("../Model/blogModel");
const User = require("../Model/userModel");
const asyncHanlder = require("express-async-handler");

const getAllBlogs = asyncHanlder(async (req, res, next) => {
    const blogs = await Blog.find({});

    if (blogs) {
        return res.status(200).json(blogs);
    }
    return res.status(200).json({ message: "No Blogs Found" });
});

const addBlog = asyncHanlder(async (req, res, next) => {
    const { title, description, image, user } = req.body;

    const existingUser = User.findById(user);
    if (!existingUser) {
        res.status(403);
        throw new Error("Please Login to Continue")
    }

    const blog = Blog({
        title,
        description,
        image,
        user: existingUser._id
    });

    const session = mongoose.startSession();
    (await session).startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    existingUser.save({ session });
    (await session).commitTransaction();


    if (addBlog) {
        return res.status(200).json(addBlog);
    }

    res.status(500);
    throw new Error("Something bad Happened");
});

const getBlogById = asyncHanlder(async (req, res, next) => {
    const { id } = req.params;

    const findBlog = await Blog.findById(id);

    if (!findBlog) {
        res.status(404);
        throw new Error("Blog Not Found");
    }
    return res.status(200).json(findBlog);
});

const updateBlog = asyncHanlder(async (req, res, next) => {

    const { title, description } = req.body;
    const { id } = req.params;

    const updateBlog = await Blog.findByIdAndUpdate(id, {
        title: title,
        description: description
    }, {
        new: true
    });

    if (updateBlog) {
        return res.status(200).json({ message: "Updated Successfully" });
    }

    res.status(500);
    throw new Error("Something Bad Happened");
});

const deleteBlog = asyncHanlder(async (req, res) => {
    const { id } = req.params;

    const deleteBlog = await Blog.findByIdAndDelete(id).populate("user");
    await deleteBlog.user.blogs.pull(deleteBlog);
    await deleteBlog.user.save();
    
    if (deleteBlog) {
        return res.status(200).json({ message: "Blog Deleted Successfully" });
    }

    res.status(500);
    throw new Error("Something bad Occurred");
});




module.exports = { getAllBlogs, addBlog, getBlogById, deleteBlog, updateBlog }
