import "./BlogListTag.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { QUERY_BLOGS_BY_TAG } from "../../../utils/queries";
const BlogListByTag = () => {
  const { name } = useParams();
  const { loading, data } = useQuery(QUERY_BLOGS_BY_TAG, {
    // pass URL parameter
    variables: { tagName: name },
  });
  console.log(data);
  const blogs = data?.blogsByTag || [];
  let foundBlogs = null;

  const loadArticleHandler = (id) => {
    window.location.assign(`/article/${id}`);
  };

  if (!loading) {
    //set profile name
    foundBlogs = blogs.map((blog) => {
      return (
        <div
          key={`blog-${blog._id}`}
          className="article-row profile-click"
          onClick={() => loadArticleHandler(blog._id)}
        >
          <div className="article-info info-click">
            <h1>{blog.title}</h1>
            <h2>{blog.subtitle}</h2>
            <p>published at {blog.date}</p>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="profile-container">
      <h1>Search Results: {name}</h1>
      <hr />
      <div className="profile-posts-container">
        <h2>Articles</h2>
        <div className="article-table">{foundBlogs}</div>
      </div>
    </div>
  );
};

export default BlogListByTag;
