import { GoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { QUERY_DOES_USER_EXIST } from "../../../utils/queries";
import { useLazyQuery } from "@apollo/client";
import auth from "../../../utils/auth";
const GoogleNewLogin = () => {
  const [foundUser, setFoundUser] = useState(null);

  const [getUser, { loading, error, data }] = useLazyQuery(
    QUERY_DOES_USER_EXIST
  );

  useEffect(() => {
    if (foundUser !== null) {
      getUser({ variables: { email: foundUser } });
      if (!loading && data) {
        console.log("IN USE EFFECT");
        console.log(data.checkIfAccountExists);
        if (data.checkIfAccountExists) {
          console.log("USER ALREADY EXISTS");
          window.location.assign("/login");
        } else {
          console.log("CREATE NEW PROFILE USER WITH ADDITIONAL INFO");
        }
      }
    }
  }, [loading, data, foundUser]);

  const responseMessage = async (response) => {
    console.log(response);
    const userObj = jwtDecode(response.credential);
    console.log("LOGGING USER OBJ");
    console.log(userObj.email);
    const foundEmail = userObj.email;
    setFoundUser(foundEmail);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  );
};

export default GoogleNewLogin;
