import "./LatestArticleFeed.css";

const LatestArticleFeed = () => {
  return (
    <div className="latest-article-container">
      <h2 className="latest-title">Latest Articles</h2>
      <hr className="latest-title-linebreak"></hr>
      <div className="latest-card-container">
        <div className="latest-card">
          <img src="https://i.imgur.com/tXaFuD2h.jpg" alt="76 Place" />
          <div className="latest-card-detail-container">
            <h2>Article Place Holder Title</h2>
            <h3>Subtitle with additional description of the article</h3>
          </div>
        </div>
        <div className="latest-card">
          <img src="https://i.imgur.com/tXaFuD2h.jpg" alt="76 Place" />
          <div className="latest-card-detail-container">
            <h2>Article Place Holder Title</h2>
            <h3>Subtitle with additional description of the article</h3>
          </div>
        </div>
        <div className="latest-card">
          <img src="https://i.imgur.com/tXaFuD2h.jpg" alt="76 Place" />
          <div className="latest-card-detail-container">
            <h2>Article Place Holder Title</h2>
            <h3>Subtitle with additional description of the article</h3>
          </div>
        </div>
        <div className="latest-card">
          <img src="https://i.imgur.com/tXaFuD2h.jpg" alt="76 Place" />
          <div className="latest-card-detail-container">
            <h2>Article Place Holder Title</h2>
            <h3>Subtitle with additional description of the article</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestArticleFeed;
