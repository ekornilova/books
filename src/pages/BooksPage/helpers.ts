/* eslint-disable */
import { BookI } from '../../utils/book';
import { QuantityShopInfoI } from '../../utils/dictionaries/interface';
import { DictionaryI } from '../../store/types';
import { DictionaryOptionI } from './tableSettings';

export const getBooksWithCommonCount = (books: BookI[]): BookI => {
  return books.map((book: BookI) => {
    const commonCount = (book.quantityShopInfo || []).reduce(
      (result: number, row: QuantityShopInfoI) => {
        if (row.rests) {
          result += Number(row.rests);
        }
        return result;
      },
      0,
    );
    return {
      ...book,
      commonCount,
    };
  });
};

export const getDictionaryOptions = (
  dictionaries: DictionaryI | null,
): DictionaryOptionI | null => {
  return dictionaries
    ? {
        authors: dictionaries.authors.map(({ id, firstName, lastName }) => {
          return {
            id,
            value: `${firstName} ${lastName}`,
          };
        }),
        genres: dictionaries.genres.map(({ id, name }) => {
          return {
            id,
            value: name,
          };
        }),
        shops: dictionaries.shops.map(({ id, name }) => {
          return {
            id,
            value: name,
          };
        }),
      }
    : dictionaries;
};
