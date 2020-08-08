import { ShopI, AuthorI } from './interface';
import { mockGetApiRequest } from '../api';

export const getShops = (mockShops: ShopI[]): Promise<ShopI[]> => {
  return mockGetApiRequest(`shops`, mockShops);
};
export const getAuthors = (mockAuthors: AuthorI[]): Promise<AuthorI[]> => {
  return mockGetApiRequest(`authors`, mockAuthors);
};
