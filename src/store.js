import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.Slice';
import dashboardReducer from './features/dashboard/dashboard.Slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    houses: dashboardReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
