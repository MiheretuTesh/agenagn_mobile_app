import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.Slice';
import dashboardReducer from './features/dashboard/dashboard.Slice';
import houseReducer from './features/house/house.Slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    houses: houseReducer,
    dashboard: dashboardReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
