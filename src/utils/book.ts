import {
  mockGetApiRequest,
  mockDeleteApiRequest,
  mockPostApiRequest,
  mockUpdateApiRequest,
} from './api';
import { QuantityShopInfoI } from './dictionaries/interface';
import { SimpleType } from '../additional';

export interface BookI {
  id?: SimpleType;
  name: string;
  description?: string;
  author: SimpleType;
  genres: SimpleType[];
  isbn?: string;
  coverImage?: string;
  quantityShopInfo: QuantityShopInfoI[];
  commonCount?: number;
}

export const getBooks = (mockBooks: BookI[]): Promise<BookI[]> => {
  return mockGetApiRequest(`books`, mockBooks);
};
export const createBook = (mockBook: BookI): Promise<BookI> => {
  return mockPostApiRequest(`book`, mockBook, mockBook);
};
export const deleteBook = (idBook: string, mockBook: BookI): Promise<BookI> => {
  return mockDeleteApiRequest(`book/${idBook}`, mockBook);
};
export const updateBook = (idBook: string, mockBook: BookI): Promise<BookI> => {
  return mockUpdateApiRequest(`book/${idBook}`, mockBook, mockBook);
};
