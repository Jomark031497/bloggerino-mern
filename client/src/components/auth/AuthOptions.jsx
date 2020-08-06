import React, { useContext } from "react";
import { Button, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  buttons: {
    color: "#fff",
    height: "100%",
  },
}));

const AuthOptions = () => {
  const classes = useStyles();
  const history = useHistory();

  const { userData, setUserData } = useContext(UserContext);

  const handleLogout = (e) => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <Box component="div" className={classes.root}>
      {userData.user ? (
        <Button onClick={handleLogout} className={classes.buttons}>
          LogOut
        </Button>
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
