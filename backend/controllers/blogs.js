const mongoose = require('mongoose');
const BLOG = require("../models/blogs")



async function handleViewBlogs(req,res){
    try{
        const blogs = await BLOG.find({})
        if(!blogs || blogs.length === 0){
            return res.status(404).json({msg : "No blogs found"})
        }
        return res.json(blogs)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg : "Internal server error"})
    }
}


async function handleAddBlog(req,res) {
    const {subject , content} = req.body;

    if(!subject || !content){
        return res.status(400).json({msg : "Please provide both subject and content"})
    }
    try{
        const blog = await BLOG.create({
            subject : subject,
            content : content
        })
        return res.json({msg : "Blog added successfully"})
    } catch(err){
        console.log(err)
        return res.status(500).json({msg : "Internal server error"})
    }
}


async function handleDeleteBlog(req,res) {
    const id = req.params.id;
    if(!id){
        return res.status(400).json({msg : "Please provide a blog id"})
    }
    try{
        const blog = await BLOG.findByIdAndDelete(id)
        if(!blog){
            return res.status(404).json({msg : "Blog not found"})
        }
        return res.json({msg : "Blog deleted successfully"})
    } catch(err){
        console.log(err)
        return res.status(500).json({msg: "Internal Server Error"})
    }
}


async function handleUpdateBlogSubject(req,res){
    const id = req.params.id;
    const body = req.body;

    if(!id || !body){
        return res.status(400).json({msg : "Provide all fields"})
    }
    try{
        const blog = await BLOG.findByIdAndUpdate(id , {subject : body.updatedSubject})

        if(!blog){
            return res.status(404).json({msg : "Blog not found"})
        }

        return res.json({msg : "Blog Subject updated sucessfully"})
    } catch(err){
        console.log(err)
        return res.status(500).json({msg : "Internal Server error"})
    }
}


async function handleUpdateBlogContent(req,res){
    const id = req.params.id;
    const body = req.body;

    if(!id || !body){
        return res.status(400).json({msg : "Provide all fields"})
    }
    try{
        const blog = await BLOG.findByIdAndUpdate(id , {content : body.updatedContent})

        if(!blog){
            return res.status(404).json({msg : "Blog not found"})
        }

        return res.json({msg : "Blog Content updated sucessfully"})
    } catch(err){
        console.log(err)
        return res.status(500).json({msg : "Internal Server error"})
    }
}

module.exports = {
    handleViewBlogs,
    handleAddBlog,
    handleDeleteBlog,
    handleUpdateBlogSubject,
    handleUpdateBlogContent
}