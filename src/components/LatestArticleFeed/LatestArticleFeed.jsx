import "./LatestArticleFeed.css";

const LatestArticleFeed = (props) => {
  const foundArticles = props.blogs.map((blog) => {
    return (
      <button
        key={blog._id}
        className="latest-card-btn"
        onClick={() => loadArticleHandler(blog._id)}
      >
        <div className="latest-card">
          <img src={blog.image} alt="76 Place" />
          <div className="latest-card-detail-container">
            <h2>{blog.title}</h2>
            <h3>{blog.subtitle}</h3>
            <h3>
              by{" "}
              <a href={`/profile/${blog.author._id}`}>{blog.author.username}</a>{" "}
              at {blog.date}
            </h3>
          </div>
        </div>
      </button>
    );
  });

  const loadArticleHandler = (id) => {
    window.location.assign(`/article/${id}`);
    console.log("clicked link");
  };

  return (
    <div className="latest-article-container">
      <h2 className="latest-title">Latest Articles</h2>
      <hr className="latest-title-linebreak"></hr>
      <div className="latest-card-container">{foundArticles}</div>
    </div>
  );
};

export default LatestArticleFeed;
