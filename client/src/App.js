import React, { useEffect, useState } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { getPosts } from "./redux/actions/posts";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyles from "./styles";
import "./index.css";
import Header from "./components/header/Header";
function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [curId, setCurId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header title="MERN" />
      <Container maxWidth="lg">
        <Grow in>
          <Container>
            <Grid
              className={classes.mainContainer}
              container
              justify="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <Posts setCurId={setCurId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form curId={curId} setCurId={setCurId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </React.Fragment>
  );
}

export default App;
