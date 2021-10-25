import Dashboard from "../components/Dashboard";
import Login from "../components/Login";

const routes = [
  {
    id: "1",
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    id: "2",
    path: "/dashboard",
    exact: true,
    component: Dashboard,
  },
];
export default routes;
