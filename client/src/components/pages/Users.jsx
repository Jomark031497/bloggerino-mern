import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Grid,
  Avatar,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const getUsers = async () => {
      try {
        let token = localStorage.getItem("auth-token");
        const userRes = await Axios.get("/api/users/user-list", {
          headers: { "x-auth-token": token },
        });

        setUsers(userRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container className={classes.gridContainer} spacing={4}>
        {users &&
          users.map((user) => (
            <Grid item xs={4} key={user._id}>
              <Card className={classes.cardContainer}>
                <CardActionArea>
                  <CardContent className={classes.cardArea}>
                    <Avatar className={classes.avatar}>
                      <AccountCircleIcon />
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
