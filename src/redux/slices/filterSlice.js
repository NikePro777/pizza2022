import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    page: 1,
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

    setCurrentPage: (state,action) => {
      state.page = action.payload
    }
  },
});

export const { setSearch, setCategory,setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
