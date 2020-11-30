/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable max-len */
import axios from 'axios';
import * as constants from '../constants/userConstants';

export const login = (email: string, password: string) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: constants.USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/users/login', { email, password }, config);

    dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data });

    // eslint-disable-next-line no-undef
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: constants.USER_LOGIN_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

export const logout = () => async (dispatch: (arg0: { type: string; }) => void) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: constants.USER_LOGOUT });
  dispatch({ type: constants.USER_DETAILS_RESET });
};

export const register = (name: string, email: string, password: string) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: constants.USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/users', { name, email, password }, config);

    dispatch({ type: constants.USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: constants.USER_REGISTER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

export const listUsers = () => async (dispatch: (arg0: { type: string; payload?: any; }) => void, getState: () => { userLogin: { userInfo: any; }; }) => {
  try {
    dispatch({ type: constants.USER_LIST_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/users', config);

    dispatch({ type: constants.USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: constants.USER_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

export const getUserDetails = (id: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void, getState: () => { userLogin: { userInfo: any; }; }) => {
  try {
    dispatch({ type: constants.USER_DETAILS_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({ type: constants.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: constants.USER_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

export const deleteUser = (id: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void, getState: () => { userLogin: { userInfo: any; }; }) => {
  try {
    dispatch({ type: constants.USER_DELETE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: constants.USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: constants.USER_DELETE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

export const updateUser = (id: any, user: { name: string; email: string; isAdmin: boolean; }) => async (dispatch: (arg0: { type: string; payload?: any; }) => void, getState: () => { userLogin: { userInfo: any; }; }) => {
  try {
    dispatch({ type: constants.USER_UPDATE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${id}`, user, config);

    dispatch({ type: constants.USER_UPDATE_SUCCESS });

    dispatch({ type: constants.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: constants.USER_UPDATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};
