import { createSlice } from '@reduxjs/toolkit'

const MAX_NOTIFS = 3;

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
    setMenuOpen: (state, action) => {
      state.menuCollapse = action.payload;
    },
    changeAppStatusText: (state, action) => {
      state.appStatus = action.payload;
    },
    pushNotification: (state, action) => {
      let notif_ids = state.notifications.map(n => n.id);
      if(notif_ids.some(n_id => n_id == action.payload.id)) return;
      
      if(state.notifications.length >= MAX_NOTIFS)
        state.notifications.splice(0, 1);

      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications.splice(parseInt(action.payload), 1);
    }
  },
})

export const { setMenuOpen, menuToggle, changeAppStatusText, pushNotification, removeNotification } = appSlice.actions;
export default appSlice.reducer;