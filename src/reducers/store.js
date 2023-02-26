import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/appReducer";
import weatherReducer from "./weather/weatherReducer";
import thunk from 'redux-thunk';

export default configureStore({
  reducer: {
    app: appReducer,
    weather: weatherReducer
  }, 
  middleware: [thunk]
});