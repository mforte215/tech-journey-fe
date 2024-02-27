import "./Login.css";
import { LOGIN_USER } from "../../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../../utils/auth";
import { useRef, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
const EMAIL_REGEX = /.+@.+\..+/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
  if (Auth.loggedIn()) {
    return <Navigate replace to="/" />;
  }

  const [errorMessage, setErrorMessage] = useState("");
  const passwordRef = useRef();
  const usernameRef = useRef();
  const errorBox = useRef();

  const [login, { error, data }] = useMutation(LOGIN_USER);

  const loginHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const enteredPassword = passwordRef.current.value.trim();
    const enteredUsername = usernameRef.current.value.trim();

    console.log("FORM DATA");
    console.log(enteredUsername);
    console.log(enteredPassword);

    try {
      const { data } = await login({
        variables: {
          username: enteredUsername,
          password: enteredPassword,
        },
      });

      //take the response and use the returned token to log the user in
      Auth.login(data.login.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="signup-page-title">Login</h1>
      <h3 className="err-message" ref={errorBox}>
        {errorMessage}
      </h3>
      <div className="login-form-container">
        <form onSubmit={loginHandler}>
          <div className="signup-form-control">
            <label className="signup-label">username</label>
            <br />
            <input
              required
              className="login-input"
              type="text"
              ref={usernameRef}
            />
          </div>
          <div className="signup-form-control">
            <label className="signup-label">password</label>
            <br />
            <input
              autoComplete="on"
              required
              className="login-input"
              type="password"
              ref={passwordRef}
            />
          </div>
          <div className="signup-form-control">
            <input className="signup-btn" type="submit" value="LOGIN" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
