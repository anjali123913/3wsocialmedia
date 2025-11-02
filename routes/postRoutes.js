import express from "express";
import { createPost, getFeed, toggleLike, addComment } from "../controllers/postController.js";
import { protect } from "../middleware/auth.js";
import Post from "../models/Post.js";
const router = express.Router();

router.get("/", protect, getFeed);
router.post("/", protect, createPost);
router.post("/:id/like", protect, toggleLike);
router.post("/:id/comment", protect, addComment);
router.get("/:postId/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).select("comments");
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json({ success: true, comments: post.comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
