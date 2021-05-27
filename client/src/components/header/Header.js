import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useStyles } from "./styles";
import { Avatar } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

export default function Header({ title }) {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
          >
            {title}
          </Typography>

          {user ? (
            <div className={classes.profile}>
              <div style={{ display: "flex", gap: 15 }}>
                <Avatar
                  className={classes.purple}
                  alt={user.result.name}
                  src={user.result.imageUrl}
                >
                  {user.result.name?.charAt(0) ||
                    user.result.firstName.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6" color="textSecondary">
                  {user.result.name || user.result.firstName}
                </Typography>
              </div>
              <Button variant="outlined" color="secondary" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="outlined"
              color="primary"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
