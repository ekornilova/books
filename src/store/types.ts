import { ShopI, AuthorI } from '../utils/dictionaries/interface';
import { BookI } from '../utils/book';

export interface DictionaryI {
  authors: AuthorI[];
  shops: ShopI[];
}
export interface StoreI {
  dictionaries: DictionaryI | null;
  books: BookI[];
}
