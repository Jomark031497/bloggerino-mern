import React, { useEffect, useState } from "react";
import Axios from "axios";
import moment from "moment";
//material-ui
import { makeStyles } from "@material-ui/styles";
import { Box, Typography, Divider } from "@material-ui/core";
//components
import AddComment from "./AddComment";

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
  comments: {
    background: "#ddd",
  },
  comment: {
    background: "rgb(250,250,250)",
    padding: "1rem",
    margin: "0.5rem auto",
    borderRadius: "0.5rem",
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
      const token = localStorage.getItem("auth-token");

      const res = await Axios.get(`/api/blogs/${id}`, {
        headers: { "x-auth-token": token },
      });
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
            <Typography variant="subtitle1">by: {blog.postedBy}</Typography>
            <br />
            <Typography variant="body1">{blog.body}</Typography>
          </Box>

          <AddComment id={id} />

          <Box component="div" className={classes.comments}>
            {blog.comments.length ? (
              <>
                {blog.comments.map((comments) => (
                  <Box
                    component="div"
                    className={classes.comment}
                    key={comments._id}
                  >
                    <Typography variant="body2">
                      ~{comments.user} - {moment(comments.date).fromNow()}
                    </Typography>
                    <Typography variant="body1">{comments.comment}</Typography>
                    <Divider />
                  </Box>
                ))}
              </>
            ) : (
              <h4>No Comments...</h4>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default BlogDetails;
