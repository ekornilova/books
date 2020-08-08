import * as constants from './constants';
import { DictionaryI } from './types';
import { BookI } from '../utils/book';

export interface SetDictionaries {
  type: constants.SETDICTIONARIES;
  data: DictionaryI;
}
export interface SetBooks {
  type: constants.SETBOOKS;
  data: BookI[];
}
export type ActionI = SetDictionaries | SetBooks;
export const setDictionaries = (data: DictionaryI): SetDictionaries => ({
  type: constants.SETDICTIONARIES,
  data,
});
export const setBooks = (data: BookI[]): SetBooks => ({
  type: constants.SETBOOKS,
  data,
});
// export function authenticate(u: string, pw: string): Authenticate ({
//    type: constants.AUTHENTICATE,
//    username: u,
//    pw: pw
// });
