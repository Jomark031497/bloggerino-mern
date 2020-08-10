import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography, TextField, Button } from "@material-ui/core";
import userContext from "../../contexts/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
  },
  blogContent: {
    margin: "0.5rem",
    padding: "1rem",
    background: "rgb(250,250,250)",
    borderRadius: "1rem",
    border: "1px solid black",
  },
  comment: {
    background: "rgb(250,250,250)",
    margin: "1rem",
  },
  formContainer: {
    margin: "1rem",
  },
  commentBox: {
    width: "70%",
  },
  submitBtn: {
    width: "20%",
    margin: "auto 0.5rem",
  },
}));

const BlogDetails = (props) => {
  const classes = useStyles();
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [comment, setComment] = useState("");
  const { userData } = useContext(userContext);
  const [blog, setBlog] = useState("");

  useEffect(() => {
    const getBlog = async () => {
      let token = localStorage.getItem("auth-token");
      const res = await Axios.get(`/api/blogs/${id}`, {
        headers: { "x-auth-token": token },
      });
      setBlog(res.data);
    };

    getBlog();
    //eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = userData.user.username;
    try {
      await Axios.put(`/api/blogs/${id}`, {
        comment: { user: username, comment: comment },
      });

      console.log("comment added");
    } catch (err) {
      console.log(err);
    }

    window.location.reload();
  };

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

          <Box
            component="form"
            className={classes.formContainer}
            onSubmit={handleSubmit}
          >
            <TextField
              value={comment}
              variant="outlined"
              label="Write a comment..."
              onChange={(e) => setComment(e.target.value)}
              className={classes.commentBox}
              multiline
              rows={3}
            />

            <Button
              type="submit"
              variant="outlined"
              className={classes.submitBtn}
            >
              Submit
            </Button>
          </Box>

          <Box component="div" className={classes.comments}>
            {blog.comments.length ? (
              <>
                {blog.comments.map((comments) => (
                  <Box
                    component="div"
                    className={classes.comment}
                    key={comments._id}
                  >
                    <Typography variant="body2">~{comments.user}</Typography>
                    <Typography variant="body1">{comments.comment}</Typography>
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
