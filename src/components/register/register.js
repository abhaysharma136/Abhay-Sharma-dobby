import React, { forwardRef, useState } from "react";
import "./register.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { API } from "../../shared/global";

const PasswordValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("This is a required field"),
  phoneNumber: yup
    .string()
    .required("This field is Required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),

  password: yup
    .string()
    .min(8)
    .matches()
    .required("Your password must contain between 4 and 60 characters."),
  FirstName: yup.string().required("This is a required field"),
  LastName: yup.string().required("This is a required field"),
});


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Register() {
  const navigate = useNavigate();
  const verify = () => {
    
      if (result.message === "Registered Succesfully") {
        console.log(result);
        navigate("/login");
      }
    }
  
    
  var [result, setResult] = useState({});

  function CreateUser(newUser) {
    const res = fetch(`${API}/users2/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-Type": "application/json",
      },
    });
    res.then((result) => result.json()).then((user) => handleFinalResult(user));
  }





  const handleFinalResult = (user) => {
    setResult(user);
    console.log(user);
    handleMessage();
  };

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        FirstName: "",
        LastName: "",
        email: "",
        phoneNumber: "",
        password: "",
      },
      validationSchema: PasswordValidationSchema,
      onSubmit: (newUser, onSubmit) => {
        console.log("OnSubmit", newUser);
        CreateUser(newUser);
        onSubmit.resetForm();
      },
    });

    const [open, setOpen] = useState(false);

  const handleMessage = () => {
    console.log(result);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    verify();
  };
  return (
    <div className="loginContainer flex">
      {open ? (
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={
                  result.message === "Registered Succesfully"
                    ? "success"
                    : "error"
                }
                sx={{ width: "100%" }}
              >
                {result.message}
              </Alert>
            </Snackbar>
          ) : null}
      <div className="leftSide-container flex">
        <h1>Welcome to Imagery.</h1>
        <p>
          Lets get you all set up so start with your account and begin setting
          up your profile.
        </p>
      </div>
      <div className="rightSide-container">
        <div className="login-elements-container">
          <div>
            <form className="login-form-container flex" onSubmit={handleSubmit}>
              <h1>Begin your journey!</h1>
              <p>Get started with the bestplatform for design</p>
              <div className="login-textfields">
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="First Name"
                  variant="outlined"
                  className="form-input"
                  name="FirstName"
                  value={values.FirstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.FirstName && errors.FirstName}
                  helperText={
                    touched.FirstName && errors.FirstName
                      ? errors.FirstName
                      : ""
                  }
                />
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="LastName"
                  variant="outlined"
                  className="form-input"
                  name="LastName"
                  value={values.LastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.LastName && errors.LastName}
                  helperText={
                    touched.LastName && errors.LastName ? errors.LastName : ""
                  }
                />
                <TextField
                  id="outlined-basic"
                  type="email"
                  label="Email Address"
                  variant="outlined"
                  className="form-input"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  helperText={touched.email && errors.email ? errors.email : ""}
                />
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Phone Number"
                  variant="outlined"
                  className="form-input"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phoneNumber && errors.phoneNumber}
                  helperText={
                    touched.phoneNumber && errors.phoneNumber
                      ? errors.phoneNumber
                      : ""
                  }
                />
                <TextField
                  id="outlined-basic"
                  type="password"
                  label="Password"
                  variant="outlined"
                  className="form-input"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                  helperText={
                    touched.password && errors.password ? errors.password : ""
                  }
                />
              </div>
              <div className="loginCheckbox flex">
                <input type="checkbox" name="termsAndConditions" required />
                <p>
                  By signing up, you agree to our user Agreement, Terms of
                  Service, & Privacy Policy.
                </p>
              </div>
              <Button
                variant="contained"
                className="button-login"
                type="submit"
              >
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
