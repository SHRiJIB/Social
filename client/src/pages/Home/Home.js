import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/posts";
import { Container, Grid, Grow } from "@material-ui/core";
import useStyles from "./styles";
import Form from "../../components/Form/Form";
import Posts from "../../components/Posts/Posts";

function Home() {
  const classes = useStyles();
  const [curId, setCurId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
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
  );
}

export default Home;
