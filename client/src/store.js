import {createStore , applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk'
import rootReducer from './reducer'

const middleware = [thunk];
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    //Enable when the developing the code
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;