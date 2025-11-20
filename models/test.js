import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    snippet: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.models.blog || mongoose.model("blog", blogSchema);

async function trial() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB")
        // We try create our first blog here
const dataScienceBlog= new Blog(

    {
        title:"Why data Science Matters",
        snippet:"A short Data Science Intro",
        body:"Data Science is the key to unlocking new data potential"
    }
)

await dataScienceBlog.save()
console.log("Blog Saved Succesfully!", dataScienceBlog)
       
    } catch (error) {
      console.log(error)  
    }finally{
    await mongoose.connection.close()
}
   
}


trial()