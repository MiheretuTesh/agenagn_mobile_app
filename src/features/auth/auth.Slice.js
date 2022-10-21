import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../constants/config.keys';
import {storeToken, getToken, clearToken} from '../../utils/db-service';

export const signupUser = createAsyncThunk(
  'user/singUpUser',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${config.BASE_URI}/api/v1/auth/register`,
        formData,
      );

      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${config.BASE_URI}/api/v1/auth/login`,
        formData,
      );

      console.log('first');

      storeToken(response.data.token);

      console.log(response, 'response from login');
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async thunkAPI => {
    try {
      console.log('trying to logout');
      clearToken();
    } catch (err) {}
  },
);

const initialState = {
  registerData: [],
  loginData: '',
  token: '',
  isRegisterFetching: false,
  isRegisterSuccess: false,
  isRegisterError: false,
  isLoginFetching: false,
  isLoginSuccess: false,
  isLoginError: false,
  registerErrorMessage: '',
  loginErrorMessage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [signupUser.pending]: state => {
      state.isRegisterFetching = true;
    },
    [signupUser.fulfilled]: (state, {payload}) => {
      state.isRegisterFetching = false;
      state.isRegisterSuccess = true;
      state.registerData = payload;
    },
    [signupUser.rejected]: (state, {payload}) => {
      state.isRegisterFetching = false;
      state.isRegisterError = true;
      state.registerErrorMessage = payload;
    },

    [loginUser.pending]: state => {
      state.isLoginFetching = true;
      state.isLoginError = false;
      state.loginErrorMessage = '';
    },
    [loginUser.fulfilled]: (state, {payload}) => {
      state.isLoginFetching = false;
      state.isLoginSuccess = true;
      state.isLoginError = false;
      state.loginErrorMessage = '';
      state.loginData = payload.user;
      state.token = payload.token;
      console.log(payload, 'Payload Login Success');
    },
    [loginUser.rejected]: (state, {payload}) => {
      state.isLoginFetching = false;
      state.isLoginError = true;
      state.loginErrorMessage = payload.msg;

      console.log(state.isLoginSuccess, payload, 'Payload Login Error');
    },

    [logoutUser.pending]: state => {
      state.isLoginFetching = true;
    },
    [loginUser.fulfilled]: (state, {payload}) => {
      state.isLoginFetching = false;
      state.isLoginSuccess = true;
      state.loginData = [];
      state.token = '';
    },
    [loginUser.rejected]: (state, {payload}) => {
      state.isLoginFetching = false;
      state.isLoginError = true;
      state.loginErrorMessage = payload;
    },
  },
});

const {reducer} = authSlice;
export default reducer;
