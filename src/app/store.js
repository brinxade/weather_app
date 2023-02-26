import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../reducers/app/appReducer';
import weatherReducer from '../reducers/weather/weatherReducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
    weather: weatherReducer
  },
});
