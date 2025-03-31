export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type PizzaItems = {
  id: number;
  title: string;
  price: number;
  sizes: number[];
  imageUrl: string;
  types: number[];
  rating: number;
};

export interface PizzaSliceState {
  items: PizzaItems[];
  status: 'loading' | 'success' | 'error';
}
