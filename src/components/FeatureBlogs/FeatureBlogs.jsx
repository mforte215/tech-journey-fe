import "./FeatureBlogs.css";

const FeatureBlogs = () => {
  return (
    <div className="featured-blog-container">
      <h2 className="featured-title">Featured Articles</h2>
      <hr className="featured-title-linebreak"></hr>
      <div className="featured-top-container">
        <div className="featured-card">
          <img src="https://i.imgur.com/tXaFuD2h.jpg" alt="76 Place" />
          <h2>Article Title Placeholder</h2>
        </div>
        <div className="featured-card">
          <img src="https://i.imgur.com/tXaFuD2h.jpg" alt="76 Place" />
          <h2>Article Title Placeholder. A longer title to fit into the box</h2>
        </div>
        <div className="featured-card">
          <img src="https://i.imgur.com/tXaFuD2h.jpg" alt="76 Place" />
          <h2>Article Title Placeholder</h2>
        </div>
        <div className="featured-card">
          <img src="https://i.imgur.com/tXaFuD2h.jpg" alt="76 Place" />
          <h2>Article Title Placeholder</h2>
        </div>
      </div>
    </div>
  );
};

export default FeatureBlogs;
