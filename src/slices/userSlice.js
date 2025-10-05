import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  team: null,
  project: null,
  isAuthenticated: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const payload = action.payload || {};
      state.user = payload.user ?? null;
      state.team = payload.team ?? null;
      state.project = payload.project ?? null;
      state.isAuthenticated = payload.status === 'success' || !!payload.user;
    },
    logout: (state) => {
      state.user = null;
      state.team = null;
      state.project = null;
      state.isAuthenticated = false;
    }
  }
});

export const { loginSuccess, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectTeam = (state) => state.user.team;
export const selectProject = (state) => state.user.project;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
