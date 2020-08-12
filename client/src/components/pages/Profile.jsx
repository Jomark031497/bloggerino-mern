import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
//material-ui
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
    background: "#fff",
    padding: "1rem",
    borderRadius: "1rem",
    border: "2px solid black",
    textAlign: "center",
  },
}));

const Profile = (props) => {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const classes = useStyles();
  const [user, setUser] = useState("");

  useEffect(() => {
    const source = Axios.CancelToken.source();
    const getUser = async () => {
      try {
        let token = localStorage.getItem("auth-token");
        const userRes = await Axios.get(`/api/users/${id}`, {
          headers: { "x-auth-token": token, cancelToken: source.token },
        });
        setUser(userRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
    return () => {
      source.cancel();
    };
    //eslint-disable-next-line
  }, []);


  return (
    <>
      {user ? (
        <Box component="div" className={classes.root}>
          <Box component="div" className={classes.userInfo}>
            <Typography variant="h6">Username: {user.username}</Typography>
            <Typography variant="h6">Email: {user.email}</Typography>
            <Typography variant="subtitle2">
              Date Created: {moment(user.createdAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      ) : (
        <h4>User not found</h4>
      )}
    </>
  );
};

export default Profile;
