import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    menuCollapse: false
  },
  reducers: {
    menuToggle: (state) => {
        state.menuCollapse = !(state.menuCollapse)
    },
    changeAppStatusText: (state, action) => {
      state.appStatus = action.payload;
    }
  },
})

export const { menuToggle, changeAppStatusText } = appSlice.actions;
export default appSlice.reducer;