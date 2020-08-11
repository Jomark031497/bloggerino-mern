import React, { useContext, useState } from "react";
import {
  Button,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  buttons: {
    color: "#fff",
    height: "100%",
  },
  avatar: {
    backgroundColor: "black",
    margin: "auto",
  },
}));

const AuthOptions = () => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const { userData, setUserData } = useContext(UserContext);

  const handleLogout = (e) => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    localStorage.setItem("auth-token", undefined);
    setAnchorEl(null);
    history.push("/");
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box component="div" className={classes.root}>
      {userData.user ? (
        <>
          <IconButton className={classes.buttons} onClick={handleClick}>
            <Avatar className={classes.avatar}>
              {userData.user.username.substr(0, 1).toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                history.push("/");
                setAnchorEl(null);
              }}
            >
              Home
            </MenuItem>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem
              onClick={() => {
                history.push("/users");
                setAnchorEl(null);
              }}
            >
              Find Friends
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Button
            onClick={() => history.push("/register")}
            className={classes.buttons}
          >
            Register
          </Button>
          <Button
            onClick={() => history.push("/login")}
            className={classes.buttons}
          >
            Login
          </Button>
        </>
      )}
    </Box>
  );
};

export default AuthOptions;
