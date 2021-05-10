import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";
function Posts() {
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <h1>POSTS</h1>
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default Posts;
