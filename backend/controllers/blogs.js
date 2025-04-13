const {getUser} = require("../service/auth")
const BLOG = require("../models/blogs")



async function handleViewBlogs(req,res){
    const sessionId = req.cookies?.uid;
    const user = getUser(sessionId);

    try{
        const blogs = await BLOG.find({createdBy: user._id})
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

    const sessionId = req.cookies?.uid;
    const user = getUser(sessionId);


    if(!subject || !content){
        return res.status(400).json({msg : "Please provide both subject and content"})
    }

    // Make sure user is logged in
    if (!user) {
        return res.status(401).json({ msg: "Unauthorized. Please log in." });
    }
    
    try{
        const blog = await BLOG.create({
            subject : subject,
            content : content,
            createdBy: user._id,
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