import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchStatus', async (url, thunkAPI) => {
  const { data } = await axios.get(url);
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  // extraReducers: {
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     console.log(state);
  //   },
  // },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
