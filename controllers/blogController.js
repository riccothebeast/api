//  This Controller will have all blog logics
// Import your model

import Blog from "./Models/blogModel.js";

// view all blogs

async function getAllBlogs(req,res) {
    try {
        const blogs = await Blog.find().sort({createdAt:-1})
        // 200 ok
        res.status(200).json(blogs)

    } catch (error) {
        // 500 server error
        res.status(500).json({message:error.message})
    }
}

//get one blog
async function getOneBlog(req,res){
    try {
        const blog= await Blog.findById(req.params.id)
        if(!blog){
            //404-not found
            return res.status(404).json({message:"Blog not found"})
        }

        //incase blog is found return 200, with the blog
        //200 ok
        res.status(200).json(blog)
        
    } catch (error) {
        //500 server error
        res.status(500).json({message:error.message})
        
    }
}

async function createBlog(req,res){
    try {
        const blog=await Blog.create(req.body)
        //send a res.status(201)-->data created successfully
        res.status(201).json(blog)
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
        
    }
    async function deleteBlog(req,res) {
        try{
            const blog= await Blog.findByIdAndDelete(req.params.id)
            //check if blog doesnt exist
            if(!blog){
                return res.status(404).json({message:"Blog not found"})
            }
            //if blog is found and deleted
            res.status(200).json({message:"Blog deleted successfully"})
        }catch(error){
            res.status(500).json({message:error.message})
        }
}
async function updateBlog(req,res) {
    try{
        const blog= await Blog.findByIdAndUpdate(req.params.id,
             req.body,
              {new:true, runValidators:true}) 

         if(!blog){
            res.status(404).json({message:"Blog not found"})
            }
        res.status(200).json(blog)
        
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
}




// export all function logic
export{getAllBlogs, getOneBlog, createBlog, deleteBlog, updateBlog};