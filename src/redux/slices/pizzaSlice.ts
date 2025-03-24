import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { CartItem } from './cartSlice';

export const fetchPizzas = createAsyncThunk('pizza/fetchStatus', async (url: string) => {
  const { data } = await axios.get<CartItem[]>(url);
  return data;
});

type PizzaItems = {
  id: number;
  title: string;
  price: number;
  sizes: number[];
  imageUrl: string;
  types: number[];
  rating: number;
};
interface PizzaSliceState {
  items: PizzaItems[];
  status: 'loading' | 'success' | 'error';
}
const initialState: PizzaSliceState = {
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

  extraReducers: (builder) => {
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

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
