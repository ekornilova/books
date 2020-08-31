import * as constants from './constants';
import { ShopI, AuthorI, GenreI } from '../utils/dictionaries/interface';

export interface DictionaryI {
  authors: AuthorI[];
  shops: ShopI[];
  genres: GenreI[];
}

export type ActionSetDictionaries = {
  type: constants.SETDICTIONARIES;
  data: DictionaryI;
};
