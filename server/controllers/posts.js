const { Types } = require("mongoose");
const Post = require("../models/post.js");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Post Found");
  }
  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
  res.json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Post Found");
  }

  await Post.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.status(400).json({ message: "Unauthenticated" });

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Post Found");
  }

  const post = await Post.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(String(req.userId));
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const likedPost = await Post.findByIdAndUpdate(id, post, { new: true });
  res.json(likedPost);
};
module.exports = { getPosts, createPost, updatePost, deletePost, likePost };
