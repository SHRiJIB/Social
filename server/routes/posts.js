const express = require("express");
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/posts");

const auth = require("../middleware/auth.js");
const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likepost", auth, likePost);

module.exports = router;
