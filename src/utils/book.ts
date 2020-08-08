import {
  mockGetApiRequest,
  mockDeleteApiRequest,
  mockPostApiRequest,
  mockUpdateApiRequest,
} from './api';
import { QuantityShopInfoI } from './dictionaries/interface';

export interface BookI {
  id?: string | number;
  name: string;
  description?: string;
  author: string | number;
  genres: (string | number)[];
  isbn?: string;
  coverImage?: string;
  quantityShopInfo: QuantityShopInfoI[];
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
