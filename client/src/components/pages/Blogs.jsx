import React from "react";
import { Grid, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import BlogCard from "./BlogCard";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
  },
}));
const Blogs = ({ blogs }) => {
  console.log(blogs);
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Box component="div" className={classes.root}>
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} key={blog._id}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
        </Grid>

        <Button onClick={() => history.push("/blogs/create")}>Add Blog</Button>
      </Box>
    </>
  );
};

export default Blogs;
