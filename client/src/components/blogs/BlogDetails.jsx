import React, { useEffect, useState } from "react";
import Axios from "axios";
import moment from "moment";
//material-ui
import { makeStyles } from "@material-ui/styles";
import { Box, Typography, Divider } from "@material-ui/core";
//components
import AddComment from "./AddComment";
import BlogComments from "./BlogComments";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
  },
  blogContent: {
    padding: "1rem",
    background: "rgb(250,250,250)",
    borderRadius: "1rem",
    border: "1px solid black",
  },

  divider: {
    margin: "1rem 0",
  },
}));

const BlogDetails = (props) => {
  const classes = useStyles();
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [blog, setBlog] = useState("");

  useEffect(() => {
    const source = Axios.CancelToken.source();
    const getBlog = async () => {
      try {
        const token = localStorage.getItem("auth-token");
        const res = await Axios.get(`/api/blogs/${id}`, {
          cancelToken: source.token,
          headers: { "x-auth-token": token },
        });
        setBlog(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getBlog();
    return () => {
      source.cancel();
    };
    //eslint-disable-next-line
  }, []);

  return (
    <Box component="div" className={classes.root}>
      {blog && (
        <>
          <Box component="div" className={classes.blogContent}>
            <Typography variant="h5">{blog.title}</Typography>
            <Typography variant="subtitle1">by: {blog.postedBy}</Typography>
            <Typography variant="subtitle1">
              posted: {moment(blog.createdAt).fromNow()}
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="body1">{blog.body}</Typography>
          </Box>

          <AddComment id={id} />
          <BlogComments comments={blog.comments} />
        </>
      )}
    </Box>
  );
};

export default BlogDetails;
