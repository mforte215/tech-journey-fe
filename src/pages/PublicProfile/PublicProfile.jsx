import "./PublicProfile.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_BLOGS_BY_USER } from "../../../utils/queries";
const PublicProfile = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_BLOGS_BY_USER, {
    // pass URL parameter
    variables: { id: id },
  });
  console.log(data);
  const blogs = data?.userBlogs || [];

  const loadArticleHandler = (id) => {
    window.location.assign(`/article/${id}`);
  };
  let myBlogs = null;
  if (!loading) {
    myBlogs = blogs.map((blog) => {
      return (
        <div key={`blog-${blog._id}`} className="article-row">
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

export default PublicProfile;
