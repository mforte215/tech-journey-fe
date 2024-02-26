import "./Profile.css";
import Auth from "../../../utils/auth";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useState, useRef } from "react";
import { QUERY_MY_BLOGS } from "../../../utils/queries";
import { DELETE_BLOG } from "../../../utils/mutations";
const Profile = () => {
  if (!Auth.loggedIn()) {
    return <Navigate replace to="/" />;
  }
  const [showModal, setShowModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({});
  const modalRef = useRef();
  const deleteBtnYes = useRef();
  const deleteBtnNo = useRef();
  const deleteMessage = useRef();
  const response = useQuery(QUERY_MY_BLOGS);
  const [deleteBlog, { error, data }] = useMutation(DELETE_BLOG);

  const blogs = response.data?.me || [];

  console.log(response.data);

  let modal = null;

  const loadArticleHandler = (id) => {
    window.location.assign(`/article/${id}`);
  };

  const loadEditArticleHandler = (id) => {
    window.location.assign(`/article/edit/${id}`);
  };

  const deleteArticleModalHandler = async () => {
    try {
      console.log("LOGGING ID TO DELETE:" + currentArticle.id);
      const foundId = currentArticle.id;
      const response = await deleteBlog({
        variables: {
          removeBlogId: foundId,
        },
      });
      console.log("LOGGING DELETED ARTICLE ID");
      console.log(response);
      window.location.assign(`/profile/me`);
    } catch (error) {
      console.log("LOGGING DELETE ERROR");
      console.log(response);
      console.log(error);
    }
  };

  const showDeleteModalHandler = (id, name) => {
    console.log("LOGGING BLOG INFO");
    console.log(id);
    console.log(name);
    setCurrentArticle({
      id: id,
      name: name,
    });
    setShowModal(true);
  };

  const closeModalHandler = () => {
    console.log("CLOSING MODAL");
    setShowModal(false);
  };

  let myBlogs = (
    <div>
      <h2>LOADING</h2>
    </div>
  );

  if (!response.loading) {
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
            <br />
            <button
              className="edit-article-btn"
              onClick={() => loadEditArticleHandler(blog._id)}
            >
              edit
            </button>
            <br />
            <button
              className="delete-article-btn"
              onClick={() => showDeleteModalHandler(blog._id, blog.title)}
            >
              delete
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
      {showModal && (
        <div ref={modalRef} className="modal-panel">
          <div className="modal-content">
            <div className="modal-container">
              <span onClick={closeModalHandler} className="modal-exit-button">
                X
              </span>
              <h2 ref={deleteMessage} className="modal-title-text">
                Are you sure you want to delete the article:
                {" " + currentArticle.name}?
              </h2>
              <button
                className="modal-delete-btn"
                onClick={deleteArticleModalHandler}
                ref={deleteBtnYes}
              >
                Yes
              </button>
              <button
                className="modal-close-btn"
                onClick={closeModalHandler}
                ref={deleteBtnNo}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
