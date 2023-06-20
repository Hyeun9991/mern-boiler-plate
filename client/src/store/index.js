import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode:
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches),
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state, action) => {
      const update = !state.mode;
      console.log(action.payload);
      if (update) {
        localStorage.theme = 'dark';
      } else {
        localStorage.theme = 'light';
      }
      state.mode = update;
    },
  },
});

export const { setMode } = authSlice.actions;
export default authSlice.reducer;
