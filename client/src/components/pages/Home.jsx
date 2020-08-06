import React, { useEffect, useContext, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import userContext from "../../contexts/userContext";
import Axios from "axios";
import Blogs from "./Blogs";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
}));

const Home = () => {
  const classes = useStyles();
  const { userData } = useContext(userContext);
  const [blogs, setBlogs] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const getBlogs = async () => {
      try {
        const res = await Axios.get("/api/blogs", { signal: signal });
        setBlogs(res.data);
      } catch (err) {
        console.log(`errormoto: ${err}`);
      }
    };

    getBlogs();

    return function cleanup() {
      abortController.abort();
    };

    // eslint-disable-next-line
  }, [userData]);

  return (
    <>
      {userData.user ? (
        <div>
          <h3>Hello, you can only see this if youre logged in</h3>

          {blogs && blogs.map((blog) => <Blogs blog={blog} key={blog._id} />)}
        </div>
      ) : (
        <Box component="div" className={classes.root}>
          <Typography variant="h3">Bloggerino</Typography>
        </Box>
      )}
    </>
  );
};

export default Home;
