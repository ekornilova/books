import { BookI } from '../../utils/book';
import { QuantityShopInfoI } from '../../utils/dictionaries/interface';
import { DictionaryI } from '../../store/types';
import { DictionaryOptionI } from './tableSettings';
import { FilterSettingsI } from './FilterForm';

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
export const getFilteredBooks = (books: BookI[], filterValues: FilterSettingsI): BookI[] => {
  const filterValuesArr = Object.entries(filterValues).filter(([, val]) => val);
  if (filterValuesArr.length) {
    return books.filter((book) => {
      return filterValuesArr.every(([key, filterVal]) => {
        let bookFieldValue: any = '';
        if (key.includes('_')) {
          const [keyValue, boundary] = key.split('_');
          bookFieldValue = book[keyValue as keyof typeof book] || 0;
          return boundary === 'from' ? bookFieldValue >= filterVal : bookFieldValue <= filterVal;
        }
        bookFieldValue = book[key as keyof typeof book];
        if (Array.isArray(bookFieldValue)) {
          return bookFieldValue.includes(filterVal);
        }
        return typeof filterVal === 'number'
          ? filterVal === bookFieldValue
          : bookFieldValue.includes(filterVal);
      });
    });
  }
  return books;
};
