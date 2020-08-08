import { ShopI, AuthorI, GenreI } from './interface';
import { mockGetApiRequest } from '../api';

export const getShops = (mockShops: ShopI[]): Promise<ShopI[]> => {
  return mockGetApiRequest(`shops`, mockShops);
};
export const getAuthors = (mockAuthors: AuthorI[]): Promise<AuthorI[]> => {
  return mockGetApiRequest(`authors`, mockAuthors);
};
export const getGenres = (mockGenres: GenreI[]): Promise<GenreI[]> => {
  return mockGetApiRequest(`genres`, mockGenres);
};
export const getDictionaries = (
  authors: AuthorI[],
  shops: ShopI[],
  genres: GenreI[],
): Promise<[AuthorI[], ShopI[], GenreI[]]> => {
  return Promise.all([getAuthors(authors), getShops(shops), getGenres(genres)]);
};
