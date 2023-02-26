import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    menuCollapse: false,
    notifications: []
  },
  reducers: {
    menuToggle: (state) => {
        state.menuCollapse = !(state.menuCollapse)
    },
    changeAppStatusText: (state, action) => {
      state.appStatus = action.payload;
    },
    pushNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications.splice(parseInt(action.payload), 1);
    }
  },
})

export const { menuToggle, changeAppStatusText, pushNotification, removeNotification } = appSlice.actions;
export default appSlice.reducer;