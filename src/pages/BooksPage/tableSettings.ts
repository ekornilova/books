import { sortableFn } from '../../additional/Sorter/helper';
import { BookI } from '../../utils/book';
import { QuantityShopInfoI } from '../../utils/dictionaries/interface';
import { Alignment, Order, FieldI, OptionI } from '../../additional';
import { onlyNumberField, isNotNumberValid, isNotEmptyValid } from './helpers';

export const defaultBook = {
  name: '',
  isbn: '',
  author: '',
  genres: [],
  quantityShopInfo: [],
  description: '',
};
export const defaultQuantityShopInfo: QuantityShopInfoI = {
  shopId: '',
  rests: 0,
  bookId: '',
};
export const sortSettings = [
  {
    order: Order.Desc,
    orderBy: 'name',
    sortableFn,
  },
  {
    order: Order.Desc,
    orderBy: 'author',
    sortableFn,
  },
  {
    order: Order.Desc,
    orderBy: 'isbn',
    sortableFn,
  },
  {
    order: Order.Desc,
    orderBy: 'commonCount',
    sortableFn,
  },
];
export const headerSettings = [
  {
    field: 'Book Name',
    id: 'name',
    align: 'left' as Alignment,
  },
  {
    field: 'Description',
    id: 'description',
    align: 'left' as Alignment,
  },
  {
    field: 'Author Name',
    id: 'author',
    align: 'left' as Alignment,
  },
  {
    field: 'Genres',
    id: 'genres',
    align: 'left' as Alignment,
  },
  {
    field: 'ISBN',
    id: 'isbn',
    align: 'left' as Alignment,
  },
  {
    field: 'Total quantity on all stores',
    id: 'commonCount',
    align: 'left' as Alignment,
  },
  {
    field: 'Cover Image',
    id: 'coverImage',
    align: 'left' as Alignment,
  },
];
export const getFieldSettings = (dictionaries: DictionaryOptionI | null): FieldI<BookI>[] => {
  return [
    {
      name: 'name',
      isNotValid: isNotEmptyValid,
    },
    {
      name: 'description',
    },
    {
      type: 'select',
      name: 'author',
      options: dictionaries ? dictionaries.authors : [],
      isNotValid: isNotEmptyValid,
    },
    {
      type: 'select',
      name: 'genres',
      options: dictionaries ? dictionaries.genres : [],
      isNotValid: isNotEmptyValid,
    },
    {
      name: 'isbn',
      isNotValid: isNotEmptyValid,
    },
    {
      name: 'commonCount',
      isNotEdit: true,
    },
    {
      name: 'coverImage',
      isNotEdit: true,
      type: 'image',
    },
  ];
};
export interface DictionaryOptionI {
  shops: OptionI[];
  authors: OptionI[];
  genres: OptionI[];
}
export const getFieldSettingsInnerTable = (
  dictionaries: DictionaryOptionI | null,
): FieldI<QuantityShopInfoI>[] => {
  return [
    {
      type: 'select',
      name: 'shopId',
      options: dictionaries ? dictionaries.shops : [],
      isNotValid: isNotEmptyValid,
    },
    {
      name: 'rests',
      onChangeValue: onlyNumberField,
      isNotValid: isNotNumberValid,
    },
  ];
};
export const headerSettingsInnerTable = [
  {
    field: 'Shop Name',
    id: 'shopId',
    align: 'left' as Alignment,
  },
  {
    field: 'Count',
    id: 'rests',
    align: 'left' as Alignment,
  },
];
export const sortSettingsInnerTable = [];
