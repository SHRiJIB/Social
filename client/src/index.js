import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import App from "./App";
import reducers from "./redux/reducers";
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(reducers, applyMiddleware(compose(thunk)));
render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
