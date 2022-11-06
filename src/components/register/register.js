import React from "react";
import "./register.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
export default function Register() {
  return (
    <div className="loginContainer flex">
      <div className="leftSide-container flex">
        <h1>Welcome to Rsquare.</h1>
        <p>
          Lets get you all set up so start with your account and begin setting
          up your profile.
        </p>
      </div>
      <div className="rightSide-container">
        <div className="login-elements-container">
          <div>
            <form className="login-form-container flex">
              <h1>Begin your journey!</h1>
              <p>Get started with the bestplatform for design</p>
              <div className="login-textfields">
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="First Name"
                  variant="outlined"
                  className="form-input"
                />
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="LastName"
                  variant="outlined"
                  className="form-input"
                />
                <TextField
                  id="outlined-basic"
                  type="email"
                  label="Email Address"
                  variant="outlined"
                  className="form-input"
                />
                <TextField
                  id="outlined-basic"
                  type="number"
                  label="Phone Number"
                  variant="outlined"
                  className="form-input"
                />
                <TextField
                  id="outlined-basic"
                  type="password"
                  label="Password"
                  variant="outlined"
                  className="form-input"
                />
              </div>
              <div className="loginCheckbox flex">
                <input type="checkbox" />
                <p>
                  By signing up, you agree to our user Agreement, Terms of
                  Service, & Privacy Policy.
                </p>
              </div>
              <Button variant="contained" className="button-login">
                Sign Up
              </Button>
              <p>
                Already have an account?
                <span className="link-display">
                  <Link to="/login">Log In</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
