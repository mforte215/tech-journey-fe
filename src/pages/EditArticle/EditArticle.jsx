import "./EditArticle.css";
import Auth from "../../../utils/auth";
import { Navigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useRef, useState, useEffect } from "react";
import { EDIT_BLOG } from "../../../utils/mutations";
import { QUERY_SINGLE_BLOG_BY_USER } from "../../../utils/queries";

const EditArticle = () => {
  if (!Auth.loggedIn()) {
    return <Navigate replace to="/" />;
  }
  let blog = null;
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_BLOG_BY_USER, {
    // pass URL parameter
    variables: { blogId: id },
  });
  const [titleState, setTitleState] = useState("");
  const [subtitleState, setSubtitleState] = useState("");
  const [contentState, setContentState] = useState("");
  const [imageState, setImageState] = useState("");
  blog = data?.singleBlogByMe || {};

  useEffect(() => {
    if (!loading && data) {
      setTitleState(data.singleBlogByMe.title);
      setSubtitleState(data.singleBlogByMe.subtitle);
      setContentState(data.singleBlogByMe.content);
      setImageState(data.singleBlogByMe.image);
    }
  }, [loading, data]);

  const [errorMessage, setErrorMessage] = useState("");
  const titleRef = useRef();
  const subtitleRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();
  const errorBox = useRef();
  const [editBlog, response] = useMutation(EDIT_BLOG);

  const editBlogHandler = async (event) => {
    //get the field values
    event.preventDefault();
    const enteredTitle = titleRef.current.value.trim();
    const enteredSubtitle = subtitleRef.current.value.trim();
    const enteredContent = contentRef.current.value.trim();
    const enteredImage = imageRef.current.value.trim();

    console.log("LOGGING ENTERED ARTICLE DATA");
    console.log(enteredTitle);
    console.log(enteredSubtitle);
    console.log(enteredContent);
    console.log(enteredImage);

    try {
      const { data } = await editBlog({
        variables: {
          blogId: blog._id,
          image: enteredImage,
          title: enteredTitle,
          subtitle: enteredSubtitle,
          content: enteredContent,
        },
      });

      console.log("LOGGING NEWLY EDITED BLOG");
      console.log(data);
      window.location.assign(`/article/${data.editBlog._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  if (!loading && blog) {
    return (
      <div>
        <h1 className="add-article-page-title">Edit Article</h1>
        <h3 className="err-message" ref={errorBox}>
          {errorMessage}
        </h3>
        <div className="add-article-container">
          <form onSubmit={editBlogHandler}>
            <div className="signup-form-control">
              <label className="signup-label">title</label>
              <br />
              <input
                required
                className="signup-input"
                type="text"
                ref={titleRef}
                value={titleState}
                onChange={(e) => setTitleState(e.target.value)}
              />
            </div>
            <div className="signup-form-control">
              <label className="signup-label">subtitle</label>
              <br />
              <input
                required
                className="signup-input"
                type="text"
                ref={subtitleRef}
                value={subtitleState}
                onChange={(e) => setSubtitleState(e.target.value)}
              />
            </div>
            <div className="signup-form-control">
              <label className="signup-label">image</label>
              <br />
              <input
                autoComplete="on"
                required
                className="signup-input"
                type="text"
                ref={imageRef}
                value={imageState}
                onChange={(e) => setImageState(e.target.value)}
              />
            </div>
            <div className="signup-form-control">
              <label className="signup-label">content</label>
              <br />
              <textarea
                className="article-content-text-area"
                ref={contentRef}
                value={contentState}
                required
                onChange={(e) => setContentState(e.target.value)}
              ></textarea>
            </div>
            <div className="signup-form-control">
              <input className="signup-btn" type="submit" value="SUBMIT" />
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};
export default EditArticle;
