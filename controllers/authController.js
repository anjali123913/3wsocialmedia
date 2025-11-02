import User from "../models/User.js";
import jwt from "jsonwebtoken";

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const signup = async (req, res) => {
  const { name, email, password, avatarUrl } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already in use" });
  const user = await User.create({ name, email, password, avatarUrl });
return  res.json({ token: signToken(user._id), user: { id: user._id, name: user.name, email: user.email, avatarUrl: user.avatarUrl } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  res.json({ token: signToken(user._id), user: { id: user._id, name: user.name, email: user.email, avatarUrl: user.avatarUrl } });
};
