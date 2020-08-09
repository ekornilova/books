import { BookI } from '../../utils/book';
import { QuantityShopInfoI } from '../../utils/dictionaries/interface';
import { DictionaryI } from '../../store/types';
import { DictionaryOptionI } from './tableSettings';

export const getBooksWithCommonCount = (books: BookI[]): BookI[] => {
  return books.map((book: BookI) => {
    const commonCount = (book.quantityShopInfo || []).reduce(
      (result: number, row: QuantityShopInfoI) => {
        let newResult = result;
        if (row.rests && typeof row.rests === 'number') {
          newResult += Number(row.rests);
        }
        return newResult;
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
export const onlyNumberField = (val: string | number) => {
  return (val as string).replace(/[\D]*/g, '');
};
