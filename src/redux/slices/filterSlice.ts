import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortNameEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}
export type SortFilterSlice = { name: string; sortName: SortNameEnum };

export interface FilterSliceState {
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
    sortName: SortNameEnum.RATING,
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSort: (state, action: PayloadAction<SortFilterSlice>) => {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
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
