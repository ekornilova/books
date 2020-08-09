/* eslint-disable */
import { BookI } from '../../utils/book';
import { QuantityShopInfoI } from '../../utils/dictionaries/interface';

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
