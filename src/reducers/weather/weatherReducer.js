import { createSlice } from '@reduxjs/toolkit'

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    location: '',
    lat: 0,
    long: 0,
    timeRange: [0, 0],
    metrics: {
      temp: false,
      ppt: false,
      ws: false
    }
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload.location;
      state.lat = action.payload.lat;
      state.long = action.payload.long;
    },
    toggleMetric: (state, action) => {
      state.metrics[action.payload]=!(state.metrics[action.payload]);
    },
    updateData: (state, action) => {
      console.log("Data update request: ", action);
    }
  },
})

export const { toggleMetric, setLocation } = weatherSlice.actions;
export default weatherSlice.reducer;