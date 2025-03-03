import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchStatus', async (url) => {
  console.log(url);

  const { data } = await axios.get(url);
  return data;
});

const initialState = {
  items: [],
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
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(state);

      // state.entities.push(action.payload)
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
