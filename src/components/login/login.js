import React, { forwardRef,useEffect,useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./login.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const PasswordValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("This is a required field"),
  password: yup
    .string()
    .min(8)
    .matches()
    .required("Your password must contain between 4 and 60 characters."),
});
export default function Login() {
  
  const navigate = useNavigate();
  const [result, setResult] = useState({});
  const verify = () => {
    if (result.token) {
      console.log("veifing1");
      localStorage.setItem("token", result.token);
      localStorage.setItem("id", result.id);
      localStorage.setItem("message", result.message);

      navigate(`/dashboard/${id}`);
    }
  };

  
  function VerifyUser(newUser) {
    const res = fetch(`http://localhost:4000/users2/login`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-Type": "application/json",
      },
    });
    res
      .then((result1) => result1.json())
      .then((user) => {
        handleFinalResult(user);
      });
  }

  
  const handleFinalResult = (user) => {
    setResult(user);
    handleMessage();
  };
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: { FirstName: "", LastName: "", email: "", password: "" },
      validationSchema: PasswordValidationSchema,
      onSubmit: (newUser, onSubmit) => {
        console.log("OnSubmit", newUser);
        VerifyUser(newUser);
        onSubmit.resetForm();
      },
    });

    let id = localStorage.getItem("id");
    let message = localStorage.getItem("message");
  useEffect(() => {
    let isAuth = localStorage.getItem("token");
    if (isAuth && isAuth !== null) {
      if (message === "Successful Login") {
        navigate(`/dashboard/${id}`);
      }
    }
  });

    const [open, setOpen] = useState(false);

  const handleMessage = () => {
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
              result.message === "Invalid Credentials"
                ? "error"
                : "success"
            }
            sx={{ width: "100%" }}
          >
            {result.message}
          </Alert>
        </Snackbar>
      ) : null}
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
            <form className="login-form-container flex" onSubmit={handleSubmit}>
              <h1>Welcome Back</h1>
              <p>Please Enter your details</p>
              <div className="register-textfields flex">
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
              <div className="flex register-links">
                <div className="registerCheckbox flex">
                  <input type="checkbox" />
                  <p>rememeber me</p>
                </div>
                <Link to="">forgot password</Link>
              </div>

              <Button
                variant="contained"
                className="register-button"
                type="submit"
              >
                Log in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
