import FeatureBlogs from "../../components/FeatureBlogs/FeatureBlogs";
import LatestArticleFeed from "../../components/LatestArticleFeed/LatestArticleFeed";
import { useQuery } from "@apollo/client";

import { QUERY_BLOGS } from "../../../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_BLOGS);
  const blogs = data?.blogs || [];
  console.log("LOGGING DATA AT HOME");
  console.log(data);
  return (
    <div>
      <FeatureBlogs blogs={blogs} />
      <LatestArticleFeed blogs={blogs} />
    </div>
  );
};

export default Home;
