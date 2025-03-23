import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type SortFilterSlice = {
  name: string;
  sortName: 'rating' | 'price' | 'title';
};
interface FilterSliceState {
  searchValue: string;
  page: number;
  category: number;
  sort: SortFilterSlice;
}

const initialState: FilterSliceState = {
  searchValue: '',
  page: 1,
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
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
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

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const { setCategory, setCurrentPage, setSort, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
