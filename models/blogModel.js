import mongoose from 'mongoose';
//create a plan of your data(blueprint)
 
const{Schema}=mongoose
// schema=blueprint

const BlogSchema= new Schema(
    {
        title:{type:String,required:true},
        snippet:{type:String,required:true},
        body:{type:String,required:true}

    },

    //Timestamp=>tell us when something is created or edited**
    {timestamps:true}
)

//create the actual collection/model (reuse compiled model if present)
const Blog = mongoose.models.blog || mongoose.model("blog", BlogSchema)

//export for use in other files
export default Blog;
