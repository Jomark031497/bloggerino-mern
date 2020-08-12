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
  greeting:{
    margin: "1rem"
  }
}));

const Home = () => {
  const classes = useStyles();
  const { userData } = useContext(userContext);
  const [blogs, setBlogs] = useState("");

  useEffect(() => {
    const source = Axios.CancelToken.source();
    const getBlogs = async () => {
      try {
        let token = localStorage.getItem("auth-token");

        const res = await Axios.get("/api/blogs", {
          cancelToken: source.token,
          headers: { "x-auth-token": token },
        });
        setBlogs(res.data);
      } catch (err) {
        console.log(`errormoto: ${err}`);
      }
    };

    getBlogs();
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line
  }, [userData]);

  return (
    <>
      {userData.user ? (
        <>
          <Typography variant="h6" className={classes.greeting}>
            Hello, {userData.user.username}
          </Typography>
          {blogs && <Blogs blogs={blogs} />}
        </>
      ) : (
        <Box component="div" className={classes.root}>
          <Typography variant="h3">Bloggerino</Typography>
        </Box>
      )}
    </>
  );
};

export default Home;
