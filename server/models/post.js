const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = new schema(
  {
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
