import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserContext from './contexts/userContext';
import Axios from "axios";
//Material-ui
import CssBaseLine from '@material-ui/core/CssBaseline';
import { CircularProgress } from '@material-ui/core';
//components
import Users from "./components/pages/Users"
import BlogDetails from "./components/blogs/BlogDetails";
import Home from './components/pages/Home';
import AddBlog from "./components/blogs/AddBlog";
import Navbar from './components/layouts/Navbar';
import Footer from "./components/layouts/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/pages/Profile";

const App = () => {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    const checkLoggedIn = async () => {
      setIsLoading(true);
      try {
        let token = localStorage.getItem("auth-token");
        if (token === null || token === undefined) {
          localStorage.setItem("auth-token", "");
          token = "";
        }
        const tokenRes = await Axios.post(
          "/api/users/isTokenValid", null, { headers: { "x-auth-token": token }, cancelToken: source.token, }
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
    return () => {
      source.cancel()
    }
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
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/blogs/create" component={AddBlog} />
            <Route exact path="/blogs/:id" render={(props) => <BlogDetails {...props} />} />
            <Route exact path="/users/" component={Users} />
            <Route exact path="/users/profile/:id" render={(props) => <Profile {...props} />} />
          </Switch>
        }
        <Footer />
      </UserContext.Provider>
    </Router>
  )
}

export default App
