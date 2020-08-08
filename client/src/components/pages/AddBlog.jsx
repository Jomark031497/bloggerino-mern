import React, { useState, useContext } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import userContext from "../../contexts/userContext";

const AddBlog = () => {
  const [blog, setBlog] = useState({
    postedBy: "",
    title: "",
    body: "",
  });

  const history = useHistory();
  const { userData } = useContext(userContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      postedBy: userData.user.username,
      title: blog.title,
      body: blog.body,
    };

    try {
      let token = localStorage.getItem("auth-token");
      const tokenRes = await Axios.post("/api/users/isTokenValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenRes) {
        await Axios.post("/api/blogs/create", newBlog);
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        required
        label="Title"
        variant="outlined"
        type="text"
        value={blog.title}
        fullWidth
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
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
      />

      <Button type="submit" variant="outlined">
        Add Blog
      </Button>
    </Box>
  );
};

export default AddBlog;
