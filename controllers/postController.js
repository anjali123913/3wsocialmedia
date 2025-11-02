import Post from "../models/Post.js";
import User from "../models/User.js";

// create post
export const createPost = async (req, res) => {
  const { text, imageUrl } = req.body;
  if (!text && !imageUrl) return res.status(400).json({ message: "Provide text or image" });

  const post = await Post.create({
    authorId: req.user._id,
    authorName: req.user.name,
    text,
    imageUrl
  });
  res.json(post);
};

// get feed with pagination
export const getFeed = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);
  const skip = (page - 1) * limit;

  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Post.countDocuments();
  res.json({ posts, total, page, limit });
};

// like/unlike
export const toggleLike = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const index = post.likes.findIndex(l => l.toString() === userId.toString());
  if (index === -1) {
    post.likes.push(userId);
  } else {
    post.likes.splice(index, 1);
  }
  await post.save();
  res.json({ likesCount: post.likes.length, likes: post.likes });
};

// comment
export const addComment = async (req, res) => {
  const postId = req.params.id;
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: "Comment cannot be empty" });

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.comments.push({ userId: req.user._id, userName: req.user.name, text });
  await post.save();
  res.json({ commentsCount: post.comments.length, comments: post.comments });
};
