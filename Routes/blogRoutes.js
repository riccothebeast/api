import { getAllBlogs, getOneBlog, createBlog, deleteBlog, updateBlog } from "../controllers/blogController.js";

//we useexpress router to set up routing in node
import express from "express";
const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id",getOneBlog)
router.post("/",createBlog)
router.delete("/:id",deleteBlog)
router.put("/:id",updateBlog)

export default router;