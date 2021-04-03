import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux'
import store from './store'

import setAuthToken from "./utils/setAuthToken";
import jwt_decode from 'jwt-decode'
import {logoutUser, setCurrentUser} from "./actions/authActions";

import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer"
import Landing from "./component/layout/Landing";

import Register from "./component/outh/Register";
import Login from "./component/outh/Login";
import Dashboard from "./component/dashboard/Dashboard";
import './App.css';
import isEmpty from "./validation/isEmpty";
import {clearCurrentProfile} from "./actions/profileAction";
import PrivateRoute from "./component/common/PrivateRoute";
import CreateProfile from "./component/create-profile/createProfile";
import EditProfile from "./component/edit-profile/EditProfile";
import AddExperience from "./component/add-qualificcation/AddExperience";
import AddEducation from "./component/add-qualificcation/AddEducation";
import Profiles from "./component/profiles/Profiles";
import Profile from "./component/profile/Profile";
import NotFound from "./component/not-found/NotFound";
import Posts from "./component/posts/Posts";
import Post from "./component/post/post";
// import Switch from "react-router-dom/es/Switch";

//Check For Token
if (localStorage.jwtToken){
  //set token to Auth header
  setAuthToken(localStorage.jwtToken);
  //Decode the jwt token
  if (isEmpty(localStorage.jwtToken)){
    const decoded = jwt_decode(localStorage.jwtToken);
    // store the current user
    store.dispatch(setCurrentUser(decoded));
    //check for expire token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime){
      //Logout user
      store.dispatch(logoutUser());
      //Clear current Profile
      store.dispatch(clearCurrentProfile());
      //Redirect the login page
      window.location.href('/login');
    }
  }
}


class App extends Component {
  render() {
    return(
      <Provider store={store} >
        <BrowserRouter>
          <div className ="App" >
            <Navbar />
            <Route exact path="/" component={ Landing } />
            <div className="container">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-experience/" component={AddExperience} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/not-found" component={ NotFound } />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
