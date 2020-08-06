import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Typography, TextField, Button } from "@material-ui/core";
import Axios from "axios";
import UserContext from "../../contexts/userContext";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {},
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

const Login = () => {
  const [users, setUsers] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState();
  const classes = useStyles();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginRes = await Axios.post("/api/users/login", {
        username: users.username,
        password: users.password,
      });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem("auth-token", loginRes.data.token);

      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      setUsers({ username: "", password: "" });
    }
  };

  return (
    <Box component="div">
      <form onSubmit={handleSubmit} className={classes.form}>
        <Typography variant="h5">Log In</Typography>
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
          name="username"
          label="Username"
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          className={classes.textfield}
          value={users.username}
          onChange={(e) => setUsers({ ...users, username: e.target.value })}
        />

        <TextField
          required
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          className={classes.textfield}
          value={users.password}
          onChange={(e) => setUsers({ ...users, password: e.target.value })}
        />

        <Button
          variant="contained"
          type="submit"
          size="medium"
          className={classes.button}
        >
          Log In
        </Button>
      </form>
    </Box>
  );
};

export default Login;
