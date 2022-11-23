import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../constants/config.keys';
import {storeToken, getToken, clearToken} from '../../utils/db-service';

export const getAllHouses = createAsyncThunk(
  'houses/getHousesData',
  async thunkAPI => {
    try {
      const {data} = await axios.get(`${config.BASE_URI}/api/v1/houses/houses`);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const getHouse = createAsyncThunk(
  'houses/getHouseData',
  async (id, thunkAPI) => {
    try {
      const {data} = await axios.get(
        `${config.BASE_URI}/api/v1/houses/house/${id}`,
      );

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const createNewHouse = createAsyncThunk(
  'house/createNewHouse',
  async (formData, imageData, thunkAPI) => {
    try {
      const token = await getToken();

      const responseData = await axios.post(
        `${config.BASE_URI}/api/v1/houses/house`,
        formData,
        {
          headers: {
            'x-access-token': token ? `Bearer ${token}` : null,
          },
        },
      );

      // const responseDataImage = await axios.post(
      //   `${config.BASE_URI}/api/v1/houses/house`,
      //   // `http://10.5.197.205:4000/api/v1/houses/uploadHouseImages`,
      //   imageData,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //       'x-access-token': token ? `Bearer ${token}` : null,
      //     },
      //   },
      // );

      return responseData;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const updateHouse = createAsyncThunk(
  'house/updateHouse',
  async (formData, thunkAPI) => {
    try {
      const token = await getToken();
      const {data} = await axios.put(
        `${config.BASE_URI}/api/v1/houses/house/${formData.houseId}`,
        formData,
        {
          headers: {
            'x-access-token': token ? `Bearer ${token}` : '',
          },
        },
      );
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  housesData: [],
  houseData: '',

  isHousesDataLoading: false,
  isHousesDataSuccess: false,
  isHousesDataFailed: false,
  getHousesError: '',

  isHouseDataLoading: false,
  isHouseDataSuccess: false,
  isHouseDataFailed: false,
  getHouseError: '',

  createHouseLoading: false,
  createHouseSuccess: false,
  createHouseFailed: false,
  createHouseError: '',

  updateHouseLoading: false,
  updateHouseSuccess: false,
  updateHouseFail: false,
  updateHouseError: '',
};

const houseSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllHouses.pending]: state => {
      state.isHousesDataLoading = true;
      // state.isHousesDataSuccess = false;
    },
    [getAllHouses.fulfilled]: (state, {payload}) => {
      state.isHousesDataLoading = false;
      state.isHousesDataSuccess = true;
      state.isHousesDataFailed = false;
      state.housesData = payload;
    },
    [getAllHouses.rejected]: (state, {payload}) => {
      state.isHousesDataFailed = true;
      state.getHousesError = payload;
    },

    [getHouse.pending]: state => {
      state.isHouseDataLoading = true;
      state.isHouseDataSuccess = false;
    },
    [getHouse.fulfilled]: (state, {payload}) => {
      state.isHouseDataLoading = false;
      state.isHouseDataSuccess = true;
      state.houseData = payload;
    },
    [getHouse.rejected]: (state, {payload}) => {
      state.isHouseDataFailed = true;
      state.getHouseError = payload;
    },
    [createNewHouse.pending]: state => {
      state.createHouseLoading = true;
      state.createHouseSuccess = false;
    },
    [createNewHouse.fulfilled]: (state, {payload}) => {
      state.createHouseLoading = false;
      state.createHouseSuccess = true;
      state.createHouseFailed = false;
      console.log(payload, 'created Successful');
    },
    [createNewHouse.rejected]: (state, {payload}) => {
      state.createHouseLoading = false;
      state.createHouseSuccess = false;
      state.createHouseFailed = true;
      state.createHouseError = payload.data;
      console.log(payload, 'Create House Error');
    },

    [updateHouse.pending]: state => {
      state.updateHouseLoading = true;
      state.updateHouseSuccess = false;
    },
    [updateHouse.fulfilled]: (state, {payload}) => {
      state.updateHouseLoading = false;
      state.updateHouseSuccess = true;
      state.updateHouseError = false;
      console.log(payload, 'Update Successful');
    },
    [updateHouse.rejected]: (state, {payload}) => {
      state.updateHouseFail = false;
      state.updateHouseSuccess = false;
      state.updateHouseFail = true;
      state.updateHouseError = payload.data;
      console.log(payload, 'Update House Error');
    },
  },
});

const {reducer} = houseSlice;
export default reducer;
