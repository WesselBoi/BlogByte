const express = require('express');
const { handleViewBlogs , handleAddBlog , handleDeleteBlog , handleUpdateBlogSubject , handleUpdateBlogContent} = require("../controllers/blogs")

const router = express.Router();

router.get("/" , handleViewBlogs)
router.post("/add" , handleAddBlog)
router.delete("/delete/:id" , handleDeleteBlog)
router.patch("/update/subject/:id" , handleUpdateBlogSubject)
router.patch("/update/content/:id" , handleUpdateBlogContent)


module.exports = router



