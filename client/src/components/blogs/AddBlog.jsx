import React, { useState, useContext } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import userContext from "../../contexts/userContext";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
    padding: "1rem",
    justifyContent: "center",
    textAlign: "center",
  },
  textfield: {
    margin: "1rem auto",
  },
  submitBtn: {},
}));
const AddBlog = () => {
  const [blog, setBlog] = useState({
    postedBy: "",
    title: "",
    body: "",
  });

  const history = useHistory();
  const { userData } = useContext(userContext);
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      postedBy: userData.user.username,
      title: blog.title,
      body: blog.body,
    };

    try {
      let token = localStorage.getItem("auth-token");

      await Axios.post("/api/blogs/create", newBlog, {
        headers: { "x-auth-token": token },
      });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={classes.root}>
      <TextField
        required
        label="Title"
        variant="outlined"
        type="text"
        value={blog.title}
        fullWidth
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        className={classes.textfield}
      />
      <TextField
        required
        multiline
        rows={3}
        label="Body"
        fullWidth
        variant="outlined"
        type="text"
        value={blog.body}
        onChange={(e) => setBlog({ ...blog, body: e.target.value })}
        className={classes.textfield}
      />
      <br /> <br />
      <Button type="submit" variant="outlined" className={classes.submitBtn}>
        Add Blog
      </Button>
    </Box>
  );
};

export default AddBlog;
