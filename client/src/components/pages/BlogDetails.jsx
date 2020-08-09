import React, { useEffect, useState } from "react";
import Axios from "axios";

const BlogDetails = (props) => {
  const { match } = props;
  const { params } = match;
  const { id } = params;

  const [blog, setBlog] = useState("");

  useEffect(() => {
    const getBlog = async () => {
      const res = await Axios.get(`/api/blogs/${id}`);
      setBlog(res.data);
    };

    getBlog();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {blog && (
        <>
          <h3>{blog.postedBy}</h3>
          <h3>{blog.title}</h3>
          <h3>{blog.body}</h3>
        </>
      )}
    </div>
  );
};

export default BlogDetails;
