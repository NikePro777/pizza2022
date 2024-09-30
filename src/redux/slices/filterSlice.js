import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    value: '',
  },
  reducers: {
    setSearch: (state) => {
      state.value = 'пепп';
    },
  },
});

export const { setSearch } = filterSlice.actions;

export default filterSlice.reducer;
