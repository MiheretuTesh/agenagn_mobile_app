import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.Slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
