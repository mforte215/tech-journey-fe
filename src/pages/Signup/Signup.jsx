import "./Signup.css";
import { ADD_USER } from "../../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../../utils/auth";
import { useRef, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
const EMAIL_REGEX = /.+@.+\..+/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
  if (Auth.loggedIn()) {
    return <Navigate replace to="/" />;
  }
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const secondPasRef = useRef();
  const usernameRef = useRef();
  const errorBox = useRef();

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const signUpHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const enteredEmail = emailRef.current.value.trim();
    const enteredPassword = passwordRef.current.value.trim();
    const enteredUsername = usernameRef.current.value.trim();
    const enteredSecondPassword = secondPasRef.current.value.trim();

    if (enteredPassword !== enteredSecondPassword) {
      setErrorMessage("PASSWORDS DID NOT MATCH");
      errorBox.current.focus();
    }

    console.log("FORM DATA");
    console.log(enteredEmail);
    console.log(enteredUsername);
    console.log(enteredPassword);
    console.log(enteredSecondPassword);

    try {
      const { data } = await addUser({
        variables: {
          username: enteredUsername,
          email: enteredEmail,
          password: enteredPassword,
        },
      });

      //take the response and use the returned token to log the user in
      Auth.login(data.addUser.token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="signup-page-title">Sign Up</h1>
      <h3 className="err-message" ref={errorBox}>
        {errorMessage}
      </h3>
      <div className="signup-form-container">
        <form onSubmit={signUpHandler}>
          <div className="signup-form-control">
            <label className="signup-label">email</label>
            <br />
            <input
              required
              className="signup-input"
              type="email"
              ref={emailRef}
            />
          </div>
          <div className="signup-form-control">
            <label className="signup-label">username</label>
            <br />
            <input
              required
              className="signup-input"
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
              className="signup-input"
              type="password"
              ref={passwordRef}
            />
          </div>
          <div className="signup-form-control">
            <label className="signup-label">confirm password</label>
            <br />
            <input
              autoComplete="on"
              className="signup-input"
              type="password"
              ref={secondPasRef}
              required
            />
          </div>
          <div className="signup-form-control">
            <input className="signup-btn" type="submit" value="SUBMIT" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
