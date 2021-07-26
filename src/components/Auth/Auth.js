import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button2 from "../Button/Button";
import { useHistory } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";
// import { Button, Grid } from "@material-ui/core";
import { signin } from "../../actions/auth";
// import { AUTH } from "../../constants/actionTypes";
// import useStyles from "./styles";
import Input from "./Input";
// import GoogleIcon from "./icon";
import SecureLogin from "../../images/secure_login.svg";
import "./auth.scss";
import "./input.scss";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(form, history));
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            {isSignup ? null : <img src={SecureLogin} alt="Secure Login" />}
            {isSignup && (
              <>
                <div className="input-container">
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    color="#f1f1f2"
                    type="input"
                    className="first-name"
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    type="input"
                    className="last-name"
                  />
                </div>
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            <Button2
              type="submit"
              text="SIGN IN"
              class="btn btn_white"
            ></Button2>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
