import "./AddArticle.css";
import Auth from "../../../utils/auth";
import { Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useRef, useState, useEffect } from "react";
import { ADD_BLOG } from "../../../utils/mutations";
const AddArticle = () => {
  if (!Auth.loggedIn()) {
    return <Navigate replace to="/" />;
  }

  const [errorMessage, setErrorMessage] = useState("");
  const titleRef = useRef();
  const subtitleRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();
  const errorBox = useRef();

  const [addBlog, { error, data }] = useMutation(ADD_BLOG);

  const addBlogHandler = async (event) => {
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
      const { data } = await addBlog({
        variables: {
          image: enteredImage,
          title: enteredTitle,
          subtitle: enteredSubtitle,
          content: enteredContent,
        },
      });

      console.log("LOGGING NEWLY CREATED BLOG");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="add-article-page-title">New Article</h1>
      <h3 className="err-message" ref={errorBox}>
        {errorMessage}
      </h3>
      <div className="add-article-container">
        <form onSubmit={addBlogHandler}>
          <div className="signup-form-control">
            <label className="signup-label">title</label>
            <br />
            <input
              required
              className="signup-input"
              type="text"
              ref={titleRef}
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
            />
          </div>
          <div className="signup-form-control">
            <label className="signup-label">content</label>
            <br />
            <textarea
              className="article-content-text-area"
              ref={contentRef}
              required
            ></textarea>
          </div>
          <div className="signup-form-control">
            <input className="signup-btn" type="submit" value="SUBMIT" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
