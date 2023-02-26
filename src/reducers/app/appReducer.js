import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    menuCollapse: false,
    appStatus: 'Howdy!',
  },
  reducers: {
    menuToggle: (state) => {
        console.log("toggling menu: ");
        state.menuCollapse = !(state.menuCollapse)
    },
    changeAppStatusText: (state, action) => {
      state.appStatus = action.payload;
    }
  },
})

export const { menuToggle, changeAppStatusText } = appSlice.actions;
export default appSlice.reducer;