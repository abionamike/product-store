/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import axios from 'axios';
import * as constants from '../constants/productConstants';

export const listProducts = () => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: constants.PRODUCT_LIST_REQUEST });

    const { data } = await axios.get('/api/products');

    dispatch({ type: constants.PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: constants.PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

export const createProduct = (product: { name: string; price: number; image: string; rating: number; category: string; description: string; }) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: constants.PRODUCT_CREATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/products', product, config);

    dispatch({ type: constants.PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: constants.PRODUCT_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

export const updateProduct = (product: { id: any; name?: string; price?: number; image?: string; rating?: number; category?: string; description?: string; }) => async (dispatch: (arg0: { type: string; payload?: any; }) => void, getState: () => { userLogin: { userInfo: any; }; }) => {
  try {
    dispatch({ type: constants.PRODUCT_UPDATE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/products/${product.id}`, product, config);

    dispatch({ type: constants.PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: constants.PRODUCT_UPDATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

export const deleteProduct = (id: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void, getState: () => { userLogin: { userInfo: any; }; }) => {
  try {
    dispatch({ type: constants.PRODUCT_DELETE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: constants.PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: constants.PRODUCT_DELETE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

export const listProductDetails = (id: any) => async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
  try {
    dispatch({ type: constants.PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: constants.PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: constants.PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};
