import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./login.css";
import { Link } from "react-router-dom";

export default function Login() {
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
            <h1>Welcome Back</h1>
          <p>Please Enter your details</p>
          <div className="register-textfields flex">
          <TextField
                id="outlined-basic"
                type="email"
                label="Email Address"
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
          <div className="flex register-links">
          <div className="registerCheckbox flex">
                <input type="checkbox" />
                <p>
                  rememeber me
                </p>
              </div>
              <Link to="">forgot password</Link>
          </div>
          
              <Button variant="contained" className="register-button">Log in</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
