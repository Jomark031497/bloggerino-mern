import React from "react";
import { Box, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  comments: {
    background: "#ddd",
  },
  comment: {
    background: "rgb(250,250,250)",
    padding: "1rem",
    margin: "1rem auto",
    borderRadius: "0.5rem",
    borderLeft: "3px solid black",
    border: "1px solid black",
  },
}));

const BlogComments = ({ comments }) => {
  console.log(comments);
  const classes = useStyles();
  return (
    <Box component="div" className={classes.comments}>
      {comments.length ? (
        <>
          {comments.map((comments) => (
            <Box component="div" className={classes.comment} key={comments._id}>
              <Typography variant="body2">
                ~{comments.user} - {moment(comments.date).fromNow()}
              </Typography>
              <Typography variant="body1">{comments.comment}</Typography>
              <Divider />
            </Box>
          ))}
        </>
      ) : (
        <h3>No Comments... yet  </h3>
      )}
    </Box>
  );
};

export default BlogComments;
