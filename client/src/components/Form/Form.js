import React, { useState } from "react";
import { TextField, Typography, Paper, Button } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { createPost } from "../../redux/actions/posts";
function Form() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postdata));
    setPostdata({
      ...postdata,
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  const clear = (e) => {
    e.preventDefault();
    setPostdata({
      ...postdata,
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const [postdata, setPostdata] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  return (
    <div>
      <Paper className={classes.paper}>
        <form
          className={`${classes.root} ${classes.form}`}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">What is on your mind?</Typography>
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
