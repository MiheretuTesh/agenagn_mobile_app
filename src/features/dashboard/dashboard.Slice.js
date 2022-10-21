import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../constants/config.keys';
import {storeToken, getToken, clearToken} from '../../utils/db-service';

export const getHousesDataForNonLoginUser = createAsyncThunk(
  'houses/housesDataNon',
  async thunkAPI => {
    console.log('Hi please help me getting this data.');
    try {
      const response = await axios.get(
        `${config.BASE_URI}/api/v1/houses/houses`,
      );

      console.log(response.data);

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const getHousesDataLoginUser = createAsyncThunk(
  'houses/housesData',
  async (token, thunkAPI) => {
    console.log('Hi please help me getting this data. which data');
    try {
      const response = await axios.get(
        `${config.BASE_URI}/api/v1/houses/houses`,
      );

      const data = response.data;
      data.token = token;

      console.log(data, 'Houses Data for LoggedIn User');
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  token: '',
  housesData: [],
  userData: {},

  isHousesLoading: false,
  isHousesSuccess: false,
  isHousesFailed: false,

  isTokenLoading: false,
  isTokenSuccess: false,
  isTokenFail: false,

  getHousesError: '',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},

  extraReducers: {
    [getHousesDataForNonLoginUser.pending]: state => {
      state.isHousesLoading = true;
    },
    [getHousesDataForNonLoginUser.fulfilled]: (state, {payload}) => {
      state.isHousesLoading = false;
      state.isHousesSuccess = true;
      state.isHousesFailed = false;
      state.token = '';
      state.housesData = payload;
      state.isTokenSuccess = false;
    },
    [getHousesDataForNonLoginUser.fulfilled]: (state, {payload}) => {
      state.isHousesLoading = false;
      state.isHousesSuccess = false;
      state.isHousesFailed = false;
      state.token = '';
      state.getHousesError = payload.houses;
      state.isTokenSuccess = false;
    },

    [getHousesDataLoginUser.pending]: state => {
      state.isHousesLoading = true;
      state.isTokenLoading = true;
    },
    [getHousesDataLoginUser.fulfilled]: (state, {payload}) => {
      state.isHousesLoading = false;
      state.isHousesSuccess = true;
      state.isHousesFailed = false;
      state.token = payload.token;
      state.housesData = payload.houses;
      state.isTokenSuccess = true;
    },

    [getHousesDataLoginUser.rejected]: (state, {payload}) => {
      state.isHousesLoading = false;
      state.isHousesSuccess = false;
      state.isHousesFailed = true;
      state.getHousesError = payload;
      state.isTokenSuccess = false;
      state.isTokenLoading = false;
      state.isTokenFail = true;
    },
  },
});

const {reducer} = dashboardSlice;
export default reducer;
