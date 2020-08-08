import { createStore } from 'redux';
import { reducer } from './reducers';
import { StoreI } from './types';

export const store = createStore<StoreI>(reducer, {
  dictionaries: {},
  books: [],
});
