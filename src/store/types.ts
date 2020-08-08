import { ShopI, AuthorI, GenreI } from '../utils/dictionaries/interface';
import { BookI } from '../utils/book';

export interface DictionaryI {
  authors: AuthorI[];
  shops: ShopI[];
  genres: GenreI[];
}
export interface StoreI {
  dictionaries: DictionaryI | null;
  books: BookI[];
}
