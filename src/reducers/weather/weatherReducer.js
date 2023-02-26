import { createSlice } from '@reduxjs/toolkit'

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    location: "",
    lat: 0,
    long: 0,
    timeRange: ['00', '24'],
    metrics: {
      temp: false,
      ppt: false,
      ws: false
    }
  },
  reducers: {
    setLocationAndCoords: (state, action) => {
      state.location = action.payload.location;
      state.lat = action.payload.lat;
      state.long = action.payload.long;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    toggleMetric: (state, action) => {
      state.metrics[action.payload]=!(state.metrics[action.payload]);
    },
    updateData: (state, action) => {
      console.log("Data update request: ", action);
    },
    updateTime: (state, action) => {
      state.timeRange = [String(action.payload[0]).padStart(2, '0'), String(action.payload[1]).padStart(2, '0')];
    }
  },
})

export const { toggleMetric, setLocation, setLocationAndCoords, updateTime } = weatherSlice.actions;
export default weatherSlice.reducer;