import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_BLOG } from "../../../utils/queries";

const Archive = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_BLOG, {
    // pass URL parameter
    variables: { _id: id },
  });
  const blog = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
    </div>
  );
};

export default Archive;
