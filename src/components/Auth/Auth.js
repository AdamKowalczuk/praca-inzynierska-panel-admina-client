import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button2 from "../Button/Button";
import { useHistory } from "react-router-dom";
import { signin } from "../../actions/auth";
import Input from "./Input";
import Typewriter from "../../images/typewriter.svg";
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
            {isSignup ? null : <img src={Typewriter} alt="Secure Login" />}
            <Input
              name="email"
              label="Adres email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Hasło"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            <Button2
              type="submit"
              text="Zaloguj się"
              class="btn btn_white"
            ></Button2>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
