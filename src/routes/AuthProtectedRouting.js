import React from "react";
import { Redirect, Route } from "react-router-dom";
import Login from "../components/Login";
import { checkAuthentication } from "../helpers/checkAuthentication";

const AuthProtectedRoutes = (props) => {
  const isAuth = checkAuthentication();
  if (isAuth) {
    return (
      <Route
        path={props.path}
        exact={props.exact}
        component={props.component}
      />
    );
  } else {
    if (props.path === "/login") {
      return <Route path="/login" component={Login} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
};

export default AuthProtectedRoutes;
