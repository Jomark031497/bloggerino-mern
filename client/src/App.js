import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import Login from "./components/auth/Login";
import AddBlog from "./components/pages/AddBlog";
import Register from "./components/auth/Register";
import Axios from "axios";
import UserContext from './contexts/userContext';
import { CircularProgress } from '@material-ui/core';


const App = () => {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      setIsLoading(true);
      try {
        let token = localStorage.getItem("auth-token");
        if (token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }
        const tokenRes = await Axios.post(
          "/api/users/isTokenValid", null, { headers: { "x-auth-token": token } }
        );
        if (tokenRes.data) {
          const userRes = await Axios.get("/api/users/", {
            headers: { "x-auth-token": token },
          });
          setUserData({
            token,
            user: userRes.data,
          });
        }

      }
      catch (err) {
        console.log(err);
      }
      finally {
        setIsLoading(false)
      }

    };

    checkLoggedIn();
  }, []);

  return (
    <Router>
      <CssBaseLine />
      <UserContext.Provider value={{ userData, setUserData }} >
        <Navbar />
        {isLoading ? <CircularProgress />
          :
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/blogs/create" component={AddBlog} />
          </Switch>
        }
      </UserContext.Provider>
    </Router>
  )
}

export default App
