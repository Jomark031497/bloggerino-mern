import React from "react";
import { useHistory } from "react-router-dom";
//material-ui
import { Grid, Box, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
//components
import BlogCard from "./BlogCard";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
  },
  fab: {
    position: "fixed",
    bottom: "3.5rem",
    right: theme.spacing(4),
  },
}));
const Blogs = ({ blogs }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Box component="div" className={classes.root}>
        <Grid container spacing={7}>
          {blogs.map((blog) => (
            <Grid item xs={12} key={blog._id}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
        </Grid>
        <Fab
          className={classes.fab}
          color="primary"
          onClick={() => history.push("/blogs/create")}
        >
          <AddIcon />
        </Fab>
      </Box>
    </>
  );
};

export default Blogs;
