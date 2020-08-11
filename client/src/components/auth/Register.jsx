import React, { useState, useContext } from "react";
import { Box, Typography, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import { makeStyles } from "@material-ui/styles";
import Axios from "axios";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: "3rem",
    textAlign: "center",
  },
  textfield: {
    margin: "0.5rem auto",
  },
  button: {
    margin: "0.5rem auto",
    background: "#781b14",
    color: "#fff",
    fontSize: theme.spacing(4),
  },
}));

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const { setUserData } = useContext(UserContext);
  const [error, setError] = useState();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    passwordCheck: "",
    profilePic: "",
  });

  const clearFields = () => {
    setUser({
      username: "",
      email: "",
      password: "",
      passwordCheck: "",
      profilePic: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.passwordCheck) {
      setError("Password doesn't match");
      clearFields();
      return;
    }

    try {
      const newUser = {
        username: user.username,
        email: user.email,
        password: user.password,
      };

      await Axios.post("/api/users/register", newUser);
      const loginResponse = await Axios.post("/api/users/login", {
        username: user.username,
        password: user.password,
      });
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);

      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      clearFields();
    }
  };

  return (
    <Box component="div" className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Typography variant="h5">Register</Typography>
        {error && (
          <Alert
            severity="error"
            variant="outlined"
            onClose={(e) => setError(undefined)}
          >
            {error}
          </Alert>
        )}
        <TextField
          required
          label="Username"
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          className={classes.textfield}
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <TextField
          required
          label="Email"
          type="email"
          variant="outlined"
          size="small"
          fullWidth
          className={classes.textfield}
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <TextField
          required
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          className={classes.textfield}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <TextField
          required
          label="Retype Password"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          className={classes.textfield}
          value={user.passwordCheck}
          onChange={(e) => setUser({ ...user, passwordCheck: e.target.value })}
        />

        <Button
          variant="contained"
          type="submit"
          size="medium"
          className={classes.button}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
