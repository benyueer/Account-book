import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "../components/AuthGuard";
import { Layout } from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Statistics from "../pages/Statistics";
import Detail from "../pages/Detail";
import KeepAlive from "react-activation";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <KeepAlive id="main-route"><Home /></KeepAlive>,
          },
          {
            path: "statistics",
            element: <Statistics />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "detail/:id",
            element: <Detail />,
          },
        ],
      },
    ],
  },
]);
