import React from "react";
import { Container } from "@material-ui/core";
import Header from "./components/header/Header";
import Home from "./pages/Home/Home";
import "./index.css";
import { Route, Switch } from "react-router";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <React.Fragment>
      <Header title="MERN" />
      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
        </Switch>
      </Container>
    </React.Fragment>
  );
}

export default App;
