import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  authorName: { type: String, required: true },
  text: { type: String },
  imageUrl: { type: String }, // store a public URL (you can use base64 for prototype or an external upload)
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // store userIds who liked
  comments: [commentSchema],
}, { timestamps: true });

export default mongoose.model("Post", postSchema);
