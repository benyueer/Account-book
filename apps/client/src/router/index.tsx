import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "../components/AuthGuard";
import Add from "../pages/Add";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Settings from "../pages/Settings";

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
        element: <Home />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);
