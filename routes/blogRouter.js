const express = require("express");
const { getAllBlogs, addBlog, getBlogById, updateBlog, deleteBlog } = require("../controller/blogController");
const router = express.Router();


router.get("/getblog", getAllBlogs);
router.post("/add", addBlog);
router.get("/getblog/:id", getBlogById);
router.put("/update/:id", updateBlog);
router.delete("/delete", deleteBlog);


module.exports = router;
