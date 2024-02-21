import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import ErrorPage from "./pages/Error/ErrorPage.jsx";
import Latest from "./pages/Latest/Latest.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Archive from "./pages/Archive/Archive.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/latest",
        element: <Latest />,
      },
      {
        path: "/archive",
        element: <Archive />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
