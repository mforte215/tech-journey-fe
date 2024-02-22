import "./Profile.css";
import Auth from "../../../utils/auth";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_MY_BLOGS } from "../../../utils/queries";
import { DELETE_BLOG } from "../../../utils/mutations";
const Profile = () => {
  if (!Auth.loggedIn()) {
    return <Navigate replace to="/" />;
  }
  const { loading, data } = useQuery(QUERY_MY_BLOGS);

  const blogs = data?.me || [];

  console.log(data);

  const loadArticleHandler = (id) => {
    window.location.assign(`/article/${id}`);
  };

  let myBlogs = (
    <div>
      <h2>LOADING</h2>
    </div>
  );

  if (!loading) {
    myBlogs = blogs.map((blog) => {
      return (
        <div className="article-row">
          <div className="article-info">
            <h1>{blog.title}</h1>
            <h2>{blog.subtitle}</h2>
            <p>published at {blog.date}</p>
          </div>
          <div className="article-controls">
            <button
              className="view-article-btn"
              onClick={() => loadArticleHandler(blog._id)}
            >
              view
            </button>
            <br />
            <button className="edit-article-btn">edit</button>
            <br />
            <button className="delete-article-btn">delete</button>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="profile-container">
        <h1>My Profile</h1>
        <hr />
        <div className="profile-posts-container">
          <h2>Posts</h2>
          <div className="article-table">{myBlogs}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
