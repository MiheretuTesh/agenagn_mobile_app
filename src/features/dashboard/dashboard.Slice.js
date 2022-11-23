import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../constants/config.keys';
import {getToken} from '../../utils/db-service';

export const getUserData = createAsyncThunk(
  'dashboard/houses',
  async thunkAPI => {
    try {
      const token = await getToken();
      const {data} = await axios.get(
        `${config.BASE_URI}/api/v1/dashboard/houses`,
        {
          headers: {
            'x-access-token': token ? `Bearer ${token}` : null,
          },
        },
      );
      return data;
    } catch (err) {}
  },
);

export const getUser = createAsyncThunk('dashboard/user', async thunkAPI => {
  try {
    const token = await getToken();

    const {data} = await axios.get(
      `${config.BASE_URI}/api/v1/dashboard/houses`,
      {
        headers: {
          'x-access-token': token ? `Bearer ${token}` : null,
        },
      },
    );

    return data;
  } catch (err) {}
});

const initialState = {
  uploadedHousesData: {},

  uploadedHousesLoading: false,
  uploadedHousesSuccess: false,
  uploadedHousesFail: false,

  uploadedHouseErrorMsg: '',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserData.pending]: state => {
      state.uploadedHousesLoading = true;
      state.uploadedHousesSuccess = false;
    },
    [getUserData.fulfilled]: (state, {payload}) => {
      state.uploadedHousesLoading = false;
      state.uploadedHousesSuccess = true;
      state.uploadedHousesFail = false;
      state.uploadedHousesData = payload;
    },
    [getUserData.rejected]: (state, {payload}) => {
      state.uploadedHousesLoading = false;
      state.uploadedHousesSuccess = false;
      state.uploadedHousesFail = true;

      state.uploadedHouseErrorMsg = payload.msg;
    },
  },
});

const {reducer} = dashboardSlice;
export default reducer;
