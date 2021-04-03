import axios from 'axios'
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from 'jwt-decode'

import {GET_ERRORS, SET_CURRENT_USER} from "./types";

//Register Users
export const registerUser = (userData, history) => dispatch => {
  //without axios
  // return {
  //   type: TEST_DISPATCH,
  //   payload: userDate
  // }

  //wth axios
  axios.post('/api/users/register', userData)
    // .then(res => console.log("Registration success full", res.data))
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch ({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

//Login - Get User token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
    //Save To LocalStorage
      const { token } = res.data;
      //set token ls
      localStorage.setItem('jwtToken', token);
      //set token to Auth header
      setAuthToken(token);
      //Decode the jwt token
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch ({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload : decoded
  };
};

//set log out user
export const logoutUser = () => dispatch => {
  //Remove token from localStorage
  localStorage.removeItem('jwtToken');
  //Remove Auth header from future request
  setAuthToken(false);
  //set current User to {} which will
  dispatch(setCurrentUser({}))
}