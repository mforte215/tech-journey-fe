import "./FeatureBlogs.css";

const FeatureBlogs = (props) => {
  const loadFeaturedArticleHandler = (id) => {
    window.location.assign(`/article/${id}`);
    console.log("clicked link");
  };

  let count = 0;
  const foundBlogs = props.blogs.map((blog) => {
    if (count < 4) {
      count++;
      return (
        <div
          key={blog._id}
          className="featured-card"
          onClick={() => {
            loadFeaturedArticleHandler(blog._id);
          }}
        >
          <img
            className="featured-card-image"
            src={blog.image}
            alt="76 Place"
          />
          <div className="featured-card-meta">
            <h2 className="featured-card-title">{blog.title}</h2>
          </div>
        </div>
      );
    }
  });

  return (
    <div className="featured-blog-container">
      <h2 className="featured-title">Featured Articles</h2>
      <hr className="featured-title-linebreak"></hr>
      <div className="featured-top-container">{foundBlogs}</div>
    </div>
  );
};

export default FeatureBlogs;
