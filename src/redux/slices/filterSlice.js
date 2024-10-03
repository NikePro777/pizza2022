import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    search: '',
    category: 0,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },

    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setSearch, setCategory } = filterSlice.actions;

export default filterSlice.reducer;
