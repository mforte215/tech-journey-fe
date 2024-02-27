import "./AddArticle.css";
import Auth from "../../../utils/auth";
import { Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useRef, useState, useEffect } from "react";
import { ADD_BLOG } from "../../../utils/mutations";
import { Editor } from "@tinymce/tinymce-react";
const AddArticle = () => {
  if (!Auth.loggedIn()) {
    return <Navigate replace to="/" />;
  }

  const [errorMessage, setErrorMessage] = useState("");
  const titleRef = useRef();
  const subtitleRef = useRef();
  const editorRef = useRef(null);
  const imageRef = useRef();
  const errorBox = useRef();

  const [addBlog, { error, data }] = useMutation(ADD_BLOG);

  const addBlogHandler = async (event) => {
    //get the field values
    event.preventDefault();
    const enteredTitle = titleRef.current.value.trim();
    const enteredSubtitle = subtitleRef.current.value.trim();
    const enteredContent = editorRef.current.getContent();
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
      window.location.assign(`/article/${data.addBlog._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-article-page">
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
              className="add-article-input"
              type="text"
              ref={titleRef}
            />
          </div>
          <div className="signup-form-control">
            <label className="signup-label">subtitle</label>
            <br />
            <input
              required
              className="add-article-input"
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
              className="add-article-input"
              type="text"
              ref={imageRef}
            />
          </div>
          <div className="signup-form-control">
            <label className="signup-label">content</label>
            <br />
            <Editor
              apiKey="x6gn9j30jiu49yezoh90a3j3hg65io19fr4j18pp9k05zn74"
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                tinycomments_mode: "embedded",
                tinycomments_author: "Author name",
                mergetags_list: [
                  { value: "First.Name", title: "First Name" },
                  { value: "Email", title: "Email" },
                ],
                ai_request: (request, respondWith) =>
                  respondWith.string(() =>
                    Promise.reject("See docs to implement AI Assistant")
                  ),
                resize: false,
                content_css: "./article-content-text-area",
              }}
            />
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
