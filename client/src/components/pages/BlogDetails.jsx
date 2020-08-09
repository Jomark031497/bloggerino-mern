import React, { useEffect, useState } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
    background: "rgb(250,250,250)",
    borderRadius: "1rem",
    border: "1px solid black",
  },
  blogContent: {
    margin: "0.5rem",
  },
}));

const BlogDetails = (props) => {
  const classes = useStyles();
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
    <Box component="div" className={classes.root}>
      {blog && (
        <>
          <Box component="div" className={classes.blogContent}>
            <Typography variant="h5">{blog.title}</Typography>
            <Typography variant="subtitle1">by: {blog.postedBy}</Typography><br />
            <Typography variant="body1">{blog.body}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BlogDetails;
