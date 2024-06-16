import express from "express";
import { getPosts, addPost, deletePost, updatePost, getAllPosts } from "../controllers/post.js";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/", getPosts);
router.post("/", addPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;