import React, { useState, useContext } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import userContext from "../../contexts/userContext";

import AuthOptions from "../auth/AuthOptions";

const useStyles = makeStyles((theme) => ({
  logo: {
    flex: 1,
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    marginLeft: "1rem",
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    background: "rgba(200,0,0,0.9)",
  },
  bottomNav: {
    position: "fixed",
    width: "100%",
    bottom: 0,
    left: 0,
    background: "#444c59",
    height: "3rem",
    zIndex: "1",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [navVal, setNavVal] = useState(0);
  const history = useHistory();
  const { userData } = useContext(userContext);

  return (
    <Box component="div">
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.logo} variant="h5">
            <Link to="/" className={classes.link}>
              Bloggerino
            </Link>
          </Typography>

          <AuthOptions />
        </Toolbar>
      </AppBar>

      <BottomNavigation
        className={classes.bottomNav}
        value={navVal}
        onChange={(event, newValue) => {
          setNavVal(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={() => history.push("/")}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircleIcon />}
          onClick={() => history.push(`/users/profile/${userData.user.id}`)}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Navbar;
