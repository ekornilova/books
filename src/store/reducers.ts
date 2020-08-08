import { ActionI } from './actions';
import { StoreI } from './types';
import { SETBOOKS, SETDICTIONARIES } from './constants';

export function reducer(state: StoreI, action: ActionI): StoreI {
  switch (action.type) {
    case SETBOOKS:
      return {
        ...state,
        books: action.data,
      };
    case SETDICTIONARIES:
      return {
        ...state,
        dictionaries: action.data,
      };
    default:
      return state;
  }
}
