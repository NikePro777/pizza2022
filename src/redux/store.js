import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import sortSlice from './slices/sortSlice';

export default configureStore({
  reducer: {
    filter: filterSlice,
    sort: sortSlice,
  },
});
