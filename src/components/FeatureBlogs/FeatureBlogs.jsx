import "./FeatureBlogs.css";

const FeatureBlogs = (props) => {
  let count = 0;
  const foundBlogs = props.blogs.map((blog) => {
    if (count < 4) {
      count++;
      return (
        <div className="featured-card">
          <a className="featured-link" href={`article/${blog._id}`}>
            <img src={blog.image} alt="76 Place" />
            <h2 className="featured-card-title">{blog.title}</h2>
          </a>
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
