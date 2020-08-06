import React from "react";
import { Box, AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

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
}));

const Navbar = () => {
  const classes = useStyles();
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
    </Box>
  );
};

export default Navbar;
