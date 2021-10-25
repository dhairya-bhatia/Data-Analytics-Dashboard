import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import makeApiCall from "../../helpers/apiCall";
import { setToken } from "../../utils/localstorage";
import "./styles.css";

const LoginScreen = () => {
  let history = useHistory();

  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  const loginUser = (e) => {
    e.preventDefault();
    let url = `https://sigviewauth.sigmoid.io/signIn`;
    const paramsObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userName,
        password: password,
        rememberMe: true,
      }),
    };

    let response = makeApiCall(url, paramsObj);
    response.then((data) => {
      if (data.statusCode === "200") {
        setToken(data.token);
        history.push("/dashboard");
      } else {
        alert("Enter Correct Credentials");
      }
    });
  };
  return (
    <div className="container">
      <h3>Data Analytics Dashboard</h3>
      <form className="login-form" onClick={(e) => e.preventDefault()}>
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          required
          placeholder="Enter your username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          placeholder="Enter your password"
        />
        <button type="submit" onClick={loginUser}>
          Login
        </button>
      </form>
    </div>
  );
};
export default LoginScreen;
