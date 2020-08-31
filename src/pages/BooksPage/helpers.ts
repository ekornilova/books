import { BookI } from '../../utils/book';
import { QuantityShopInfoI } from '../../utils/dictionaries/interface';
import { DictionaryI } from '../../store/types';
import { DictionaryOptionI } from './tableSettings';
import { FilterSettingsI } from './FilterForm';
import { AnyObject, RecordType, SimpleType } from '../../additional';

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
export const onlyNumberField = (val: SimpleType | undefined = ''): SimpleType => {
  const valReplace = (val as string).replace(/[\D]*/g, '');
  const valNumber = Number(valReplace);
  return Number.isNaN(valNumber) ? valReplace : valNumber;
};
export const getFilteredBooks = <T extends AnyObject>(
  books: T[],
  filterValues: FilterSettingsI,
): T[] => {
  const filterValuesArr = Object.entries(filterValues).filter(([, val]) => val);
  if (filterValuesArr.length) {
    return books.filter((book) => {
      return filterValuesArr.every(([key, filterVal]) => {
        let bookFieldValue: RecordType = '';
        if (key.includes('_')) {
          const [keyValue, boundary] = key.split('_');
          bookFieldValue = book[keyValue as keyof typeof book] || 0;
          return boundary === 'from'
            ? (bookFieldValue as number) >= (filterVal as SimpleType)
            : (bookFieldValue as number) <= (filterVal as SimpleType);
        }
        bookFieldValue = book[key as keyof typeof book];
        if (Array.isArray(bookFieldValue)) {
          return bookFieldValue.includes(filterVal || '');
        }
        const pattern = new RegExp((filterVal as string) || '', 'i');
        return typeof filterVal === 'number' && typeof bookFieldValue !== 'string'
          ? filterVal === bookFieldValue
          : (bookFieldValue as string).match(pattern);
      });
    });
  }
  return books;
};
export const isNotNumberValid = (value: SimpleType): string => {
  return value > 0 ? '' : 'Count should be more than zero!';
};
const SHOULD_FILLED = 'Field should be filled!';
export const isNotEmptyValid = (value: RecordType = ''): string => {
  const checkValue = Array.isArray(value) ? value.length : value;
  return checkValue ? '' : SHOULD_FILLED;
};
