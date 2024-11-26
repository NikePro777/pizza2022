import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  search: '',
  category: 0,

  sort: {
    name: 'популярности',
    sortName: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },

    setCategory: (state, action) => {
      state.category = action.payload;
    },

    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setSearch, setCategory, setCurrentPage, setSort } = filterSlice.actions;

export default filterSlice.reducer;
