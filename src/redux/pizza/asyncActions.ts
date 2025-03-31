import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaItems } from './type';

export const fetchPizzas = createAsyncThunk('pizza/fetchStatus', async (url: URL) => {
  const { data } = await axios.get<PizzaItems[]>(url.toString());
  return data;
});
