import "./EditArticle.css";
import Auth from "../../../utils/auth";
import { Navigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useRef, useState, useEffect } from "react";
import { EDIT_BLOG } from "../../../utils/mutations";
import { Editor } from "@tinymce/tinymce-react";
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
  const editorRef = useRef();
  const imageRef = useRef();
  const errorBox = useRef();
  const [editBlog, response] = useMutation(EDIT_BLOG);

  const editBlogHandler = async (event) => {
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
                className="add-article-input"
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
                className="add-article-input"
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
                className="add-article-input"
                type="text"
                ref={imageRef}
                value={imageState}
                onChange={(e) => setImageState(e.target.value)}
              />
            </div>
            <div className="signup-form-control">
              <label className="signup-label">content</label>
              <br />
              <Editor
                apiKey="x6gn9j30jiu49yezoh90a3j3hg65io19fr4j18pp9k05zn74"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={contentState}
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
  } else {
    return <div>Loading</div>;
  }
};
export default EditArticle;
