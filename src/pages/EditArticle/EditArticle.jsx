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
  const [tagDisplay, setTagDisplay] = useState(null);
  const [tags, setTags] = useState([]);
  const tagBox = useRef("");
  blog = data?.singleBlogByMe || {};
  let tagElements = null;

  useEffect(() => {
    if (!loading && data) {
      console.log(data);
      setTitleState(data.singleBlogByMe.title);
      setSubtitleState(data.singleBlogByMe.subtitle);
      setContentState(data.singleBlogByMe.content);
      setImageState(data.singleBlogByMe.image);
      setTags(data.singleBlogByMe.tags);
      tagElements = data.singleBlogByMe.tags.map((tag) => {
        return (
          <div className="tag-container" key={tag._id}>
            <p className="tag-name">{tag.name}</p>
            <div onClick={() => removeTag(tag.name)} className="tag-delete-btn">
              X
            </div>
          </div>
        );
      });
      setTagDisplay(tagElements);
    }
  }, [loading, data]);

  useEffect(() => {
    displayTags();
  }, [tags]);

  const [errorMessage, setErrorMessage] = useState("");
  const titleRef = useRef();
  const subtitleRef = useRef();
  const editorRef = useRef();
  const imageRef = useRef();
  const errorBox = useRef();
  const [editBlog, response] = useMutation(EDIT_BLOG);

  const displayTags = () => {
    console.log(tags);
    tagElements = tags.map((tag) => {
      return (
        <div className="tag-container" key={tag._id}>
          <p className="tag-name">{tag.name}</p>
          <div onClick={() => removeTag(tag.name)} className="tag-delete-btn">
            X
          </div>
        </div>
      );
    });
    setTagDisplay(tagElements);
  };

  const removeTag = (name) => {
    //copy the current tags
    console.log("REMOVING TAG:" + name);
    let currentTags = [...tags];
    console.log(currentTags);
    const filteredTags = currentTags.filter((tag) => tag.name !== name);
    console.log("FOUND FILTERED TAGS");
    console.log(filteredTags);
    setTags(filteredTags);
    tagElements = filteredTags.map((tag) => {
      return (
        <div className="tag-container" key={tag._id}>
          <p className="tag-name">{tag.name}</p>
          <div onClick={() => removeTag(tag.name)} className="tag-delete-btn">
            X
          </div>
        </div>
      );
    });
    setTagDisplay(tagElements);
  };

  const addTagHandler = async (event) => {
    event.preventDefault();
    if (tagBox.current.value.trim()) {
      console.log("TAG TO ADD");
      let newTag = tagBox.current.value.trim();
      console.log(newTag);
      console.log("Current Tags");
      let tagObj = {
        _id: newTag + "-key",
        name: newTag,
      };
      console.log(tags);
      console.log(tags.length);
      console.log("DOES NOT TAG EXIST IN THE OBJeCT ARRAY");
      console.log(!tags.some((tag) => tag.name === tagObj.name));
      if (!tags.some((tag) => tag.name === tagObj.name)) {
        setTags([...tags, tagObj]);
        let updatedTags = [...tags, tagObj];
        tagElements = updatedTags.map((tag) => {
          return (
            <div className="tag-container" key={tag._id}>
              <p className="tag-name">{tag.name}</p>
              <div
                onClick={() => removeTag(tag.name)}
                className="tag-delete-btn"
              >
                X
              </div>
            </div>
          );
        });
        setTagDisplay(tagElements);
      }

      //show the tags
    }
  };

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
    //convert the array of objects to just an array of strings with the names
    const stringTags = [];
    for (const tag of tags) {
      stringTags.push(tag.name);
    }
    try {
      const { data } = await editBlog({
        variables: {
          blogId: blog._id,
          image: enteredImage,
          title: enteredTitle,
          subtitle: enteredSubtitle,
          content: enteredContent,
          tags: stringTags,
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
              <label className="signup-label">tags</label>
              <br />
              <input
                autoComplete="on"
                className="add-tag-input"
                type="text"
                ref={tagBox}
              />
              <button onClick={addTagHandler} className="add-tag-btn">
                Add Tag
              </button>
            </div>
            <div className="tag-display">{tagDisplay}</div>
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
