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
import AddArticle from "./pages/AddArticle/AddArticle.jsx";
import Article from "./pages/Article/Article.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import PublicProfile from "./pages/PublicProfile/PublicProfile.jsx";
import EditArticle from "./pages/EditArticle/EditArticle.jsx";
import BlogListByTag from "./pages/BlogListTags/BlogListTag.jsx";
import GoogleNewLogin from "./pages/GoogleLogin/GoogleNewLogin.jsx";

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
      {
        path: "/article/add",
        element: <AddArticle />,
      },
      {
        path: "/article/:id",
        element: <Article />,
      },
      {
        path: "/article/edit/:id",
        element: <EditArticle />,
      },
      {
        path: "/profile/me",
        element: <Profile />,
      },
      {
        path: "/profile/:id",
        element: <PublicProfile />,
      },
      {
        path: "new/login",
        element: <GoogleNewLogin />,
      },
      {
        path: "/tag/:name",
        element: <BlogListByTag />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
