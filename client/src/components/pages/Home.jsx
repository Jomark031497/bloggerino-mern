import React, { useEffect, useContext, useState } from "react";
import userContext from "../../contexts/userContext";
import Axios from "axios";
//Material-ui
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
//components
import Blogs from "../blogs/Blogs";

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

    // eslint-disable-next-line
  }, [userData]);

  return (
    <>
      {userData.user ? (
        <div>{blogs && <Blogs blogs={blogs} />}</div>
      ) : (
        <Box component="div" className={classes.root}>
          <Typography variant="h3">Bloggerino</Typography>
        </Box>
      )}
    </>
  );
};

export default Home;
