import React, { useState, useContext } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import Axios from "axios";
import UserContext from "../../contexts/userContext";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    margin: "1rem",
  },
  commentBox: {
    width: "80%",
  },
  submitBtn: {
    width: "15%",
    marginLeft: "0.5rem",
  },
}));

const AddComment = ({ id }) => {
  const [comment, setComment] = useState("");
  const { userData } = useContext(UserContext);
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = userData.user.username;
    try {
      const token = localStorage.getItem("auth-token");
      const commentRes = await Axios.put(
        `/api/blogs/${id}`,
        {
          comment: { user: username, comment: comment },
        },
        { headers: { "x-auth-token": token } }
      );

      console.log(commentRes);
    } catch (err) {
      console.log(err);
    } finally {
      window.location.reload();
    }
  };
  return (
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
        color="primary"
        rows={3}
      />

      <Button
        type="submit"
        variant="outlined"
        color="primary"
        className={classes.submitBtn}
      >
        Submit
      </Button>
    </Box>
  );
};

export default AddComment;
