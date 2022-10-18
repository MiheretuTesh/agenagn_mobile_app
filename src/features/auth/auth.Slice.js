import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../constants/config.keys';
import {storeToken, getToken} from '../../utils/db-service';

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
      const tokenSave = storeToken(response.data.token);
      if (tokenSave) {
        return response.data;
      } else {
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  registerData: [],
  loginData: [],
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
    },
    [loginUser.fulfilled]: (state, {payload}) => {
      state.isLoginFetching = false;
      state.isLoginSuccess = true;
      state.loginData = payload;
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
