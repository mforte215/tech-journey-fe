import "./Article.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import parse from "html-react-parser";

import { QUERY_BLOG } from "../../../utils/queries";

const Article = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_BLOG, {
    // pass URL parameter
    variables: { id: id },
  });
  const blog = data?.blog || {};
  console.log("LOGGING DATA");
  console.log(data);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="article-main-container">
        <img
          className="article-main-image"
          src={blog.image}
          alt={`image for ${blog.title}`}
        />
        <div className="article-main-meta">
          <h1>{blog.title}</h1>
          <h3>{blog.subtitle}</h3>
          <h3>
            By {blog.author.username} at {blog.date}
          </h3>
        </div>
        <hr />
        <p className="article-main-content">{parse(blog.content)}</p>
      </div>
    </div>
  );
};

export default Article;
