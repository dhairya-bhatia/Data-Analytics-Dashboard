import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import history from "../utils/history";
import routes from "../routes/routes";
import AuthProtectedRoutes from "../routes/AuthProtectedRouting";

const AppNavigator = () => {
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/login" />
        {routes.map((route) => {
          return (
            <AuthProtectedRoutes
              key={route.id}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          );
        })}
      </Switch>
    </Router>
  );
};

export default AppNavigator;
