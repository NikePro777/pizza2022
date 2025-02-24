import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
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
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.page = Number(action.payload.page);
      state.category = Number(action.payload.category);
    },
  },
});

export const { setSearch, setCategory, setCurrentPage, setSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
