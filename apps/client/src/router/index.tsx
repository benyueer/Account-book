import { createBrowserRouter } from "react-router-dom";
import { AuthGuard } from "../components/AuthGuard";
import { Layout } from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Statistics from "../pages/Statistics";

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
            element: <Home />,
          },
          {
            path: "statistics",
            element: <Statistics />, // Ensure Statistics/index.tsx exists and has default export
          },
          {
            path: "profile",
            element: <Profile />, // Ensure Profile/index.tsx exists and has default export
          },
        ],
      },
    ],
  },
]);
