import { ShopI, AuthorI } from './interface';
import { mockGetApiRequest } from '../api';

export const getShops = (mockShops: ShopI[]) => {
  return mockGetApiRequest(`shops`, mockShops);
};
export const getAuthors = (mockAuthors: AuthorI[]) => {
  return mockGetApiRequest(`authors`, mockAuthors);
};
