import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Axios from "axios";
import UserContext from './contexts/userContext';


const App = () => {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post("api/users/isTokenValid", null, { headers: { "x-auth-token": token } }
      );

      if (tokenRes.data) {
        const userRes = await Axios.get("api/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });

      }
    };

    try {
      checkLoggedIn();
    } catch (err) {
      console.log(`errorTo: ${err}`)
    }

  }, []);


  return (
    <Router>
      <CssBaseLine />
      <UserContext.Provider value={{ userData, setUserData }} >
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </UserContext.Provider>
    </Router>
  )
}

export default App
