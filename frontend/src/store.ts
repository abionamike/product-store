/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  userLoginReducer, userRegisterReducer,
  userListReducer, userUpdateReducer,
  userDeleteReducer, userDetailsReducer,
} from './reducers/userReducers';
import {
  productListReducer, productDetailsReducer,
  productCreateReducer, productUpdateReducer, productDeleteReducer,
} from './reducers/productReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middeware = [thunk];

const store = createStore(
  reducer, initialState, composeWithDevTools(applyMiddleware(...middeware)),
);

export default store;
