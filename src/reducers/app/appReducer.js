import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    menuCollapse: false,
  },
  reducers: {
    menuToggle: (state) => {
        console.log("toggling menu: ");
        state.menuCollapse = !(state.menuCollapse)
    },
  },
})

export const { menuToggle } = appSlice.actions;
export default appSlice.reducer;