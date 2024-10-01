import { createSlice } from '@reduxjs/toolkit';

export const sortSlice = createSlice({
  name: 'sort',
  initialState: {
    name: 'популярности',
    sortName: 'rating',
  },
  reducers: {
    setSort: (state, action) => {
      state.name = action.payload.name;
      state.sortName = action.payload.sortName;
    },
  },
});

export const { setSort } = sortSlice.actions;

export default sortSlice.reducer;
