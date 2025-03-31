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
