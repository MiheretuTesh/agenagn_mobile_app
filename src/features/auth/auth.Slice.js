import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../constants/config.keys';
import {
  storeToken,
  getToken,
  clearToken,
  storeAdmin,
} from '../../utils/db-service';

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
    console.log(formData, 'FormData Redux toolkit');
    try {
      console.log(formData, 'from Redux Toolkit');
      const {data} = await axios.post(
        `${config.BASE_URI}/api/v1/auth/login`,
        formData,
      );
      storeToken(data.token);
      if (data.isAdmin === 'admin') {
        storeAdmin(data.isAdmin);
      }
      console.log(data, 'Data');
      return data;
    } catch (err) {
      console.log('Error Occurring');
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const getCurrentUser = createAsyncThunk('user/getMe', async thunkAPI => {
  try {
    const token = await getToken();

    let data = {};

    if (token !== null) {
      const {data} = await axios.get(
        `${config.BASE_URI}/api/v1/users/user/getMe`,
        {
          headers: {
            'x-access-token': token ? `Bearer ${token}` : null,
          },
        },
      );

      data = data;
    }

    return data;
  } catch (err) {}
});
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
  registerData: '',
  loginData: '',
  isAdminValue: '',
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
      state.isAdminValue = payload.isAdmin;
    },
    [loginUser.rejected]: (state, {payload}) => {
      state.isLoginFetching = false;
      state.isLoginError = true;
      state.loginErrorMessage = payload.msg;
    },

    [getCurrentUser.pending]: state => {
      state.isLoginFetching = true;
      state.isLoginError = false;
      state.loginErrorMessage = '';
    },
    [getCurrentUser.fulfilled]: (state, {payload}) => {
      state.isLoginFetching = false;
      state.isLoginSuccess = true;
      state.isLoginError = false;
      state.loginErrorMessage = '';
      state.loginData = payload.user;
      state.token = payload.token;
      state.isAdminValue = payload.isAdmin;
    },
    [getCurrentUser.rejected]: (state, {payload}) => {
      state.isLoginFetching = false;
      state.isLoginError = true;
      state.loginErrorMessage = payload.msg;
    },

    [logoutUser.pending]: state => {
      state.isLoginFetching = true;
    },
    [logoutUser.fulfilled]: (state, {payload}) => {
      state.isLoginFetching = false;
      state.isLoginSuccess = false;
      state.loginData = '';
      state.token = '';
    },
    [logoutUser.rejected]: (state, {payload}) => {
      state.isLoginFetching = false;
      state.isLoginError = true;
      state.loginErrorMessage = payload;
    },
  },
});

const {reducer} = authSlice;
export default reducer;
