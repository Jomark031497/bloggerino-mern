import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
//material-ui
import { Box, Typography } from "@material-ui/core";

const Profile = (props) => {
  const { match } = props;
  const { params } = match;
  const { id } = params;

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
        <Box component="div">
          <Typography variant="h6">Username: {user.username}</Typography>
          <Typography variant="h6">Email: {user.email}</Typography>
          <Typography variant="h6">
            Date Created: {moment(user.createdAt).fromNow()}
          </Typography>
          <Box component="ul">
            {user.friends.length === null ? (
              user.friends.map((friend) => <li>{friend}</li>)
            ) : (
              <Typography variant="h6">You have no friends</Typography>
            )}
          </Box>
        </Box>
      ) : (
        <h4>User not found</h4>
      )}
    </>
  );
};

export default Profile;
