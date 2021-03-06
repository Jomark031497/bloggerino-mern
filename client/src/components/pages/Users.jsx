import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import {
  Grid,
  Avatar,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
    textAlign: "center",
  },
  avatar: {
    margin: "0 auto",
  },
}));

const Users = () => {
  const [users, setUsers] = useState("");
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const source = Axios.CancelToken.source();
    const getUsers = async () => {
      try {
        let token = localStorage.getItem("auth-token");
        const userRes = await Axios.get("/api/users/list", {
          cancelToken: source.token,
          headers: { "x-auth-token": token },
        });

        setUsers(userRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.gridContainer}
        spacing={4}
        justify="center"
      >
        {users &&
          users.map((user) => (
            <Grid item xs={4} key={user._id}>
              <Card className={classes.cardContainer}>
                <CardActionArea>
                  <CardContent
                    className={classes.cardArea}
                    onClick={() => history.push(`/users/profile/${user._id}`)}
                  >
                    <Avatar className={classes.avatar}>
                      {user.username.substr(0, 1).toUpperCase()}
                    </Avatar>

                    <Typography variant="body2">{user.username}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Users;
