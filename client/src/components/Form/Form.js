import React, { useState, useEffect } from "react";
import { TextField, Typography, Paper, Button } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { createPost, updatePost } from "../../redux/actions/posts";
function Form({ curId, setCurId }) {
  const [postdata, setPostdata] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    curId ? state.posts.find((p) => p._id === curId) : null
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (curId) {
      dispatch(updatePost(curId, postdata));
    } else {
      dispatch(createPost(postdata));
    }
    clear();
  };
  const clear = () => {
    setCurId(null);
    setPostdata({
      ...postdata,
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  useEffect(() => {
    if (post) setPostdata(post);
  }, [post]);
  return (
    <div>
      <Paper className={classes.paper}>
        <form
          className={`${classes.root} ${classes.form}`}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {curId ? "Edit your post" : " What is on your mind?"}
          </Typography>
          <TextField
            name="creator"
            label="Creator"
            variant="outlined"
            value={postdata.creator}
            onChange={(e) =>
              setPostdata({ ...postdata, creator: e.target.value })
            }
            fullWidth
          />
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            value={postdata.title}
            onChange={(e) =>
              setPostdata({ ...postdata, title: e.target.value })
            }
            fullWidth
          />
          <TextField
            name="message"
            label="Message"
            variant="outlined"
            value={postdata.message}
            onChange={(e) =>
              setPostdata({ ...postdata, message: e.target.value })
            }
            fullWidth
          />
          <TextField
            name="tags"
            label="Tags"
            variant="outlined"
            value={postdata.tags}
            onChange={(e) => setPostdata({ ...postdata, tags: e.target.value })}
            fullWidth
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostdata({ ...postdata, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Post
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Form;