import React, { useState } from "react";
import {
  Avatar,
  Typography,
  Button,
  Grid,
  Container,
  Paper,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "../../components/input/Input";
import Icon from "./icon";
import { signin, signup } from "../../redux/actions/auth";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export default function Auth() {
  //style
  const classes = useStyles();

  //states
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  //action dispatcher
  const dispatch = useDispatch();

  //router history
  const history = useHistory();

  //handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      console.log("signup");
      dispatch(signup(formData, history));
    } else {
      console.log("signin");
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignUp((prev) => !prev);
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log("Something went wrong.");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <React.Fragment>
                <Input
                  name="firstName"
                  label="First Name"
                  value={formData.firstName}
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  handleChange={handleChange}
                  half
                />
              </React.Fragment>
            )}
            <Input
              name="email"
              label="Email Address"
              value={formData.email}
              handleChange={handleChange}
              autoFocus={!isSignUp ? true : false}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              value={formData.password}
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                value={formData.confirmPassword}
                handleChange={handleChange}
                type={"password"}
              />
            )}
          </Grid>
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="949158279393-qqkt9vlvnpn02r0i567eba41778iho45.apps.googleusercontent.com"
            render={(renderprops) => (
              <Button
                className={classes.googleButton}
                variant="contained"
                color="primary"
                onClick={renderprops.onClick}
                disabled={renderprops.disabled}
                startIcon={<Icon />}
                fullWidth
              >
                {!isSignUp ? "Sign in with google." : "Sign up with google"}
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button variant="text" onClick={switchMode}>
                {" "}
                {isSignUp
                  ? "Already hava an account? Sign in."
                  : "Don't have an account? Sign up."}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
