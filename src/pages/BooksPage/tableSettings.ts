import { sortableFn } from '../../additional/Sorter/helper';
import { BookI } from '../../utils/book';
import { QuantityShopInfoI } from '../../utils/dictionaries/interface';
import { Alignment, Order, FieldI, OptionI, FieldType } from '../../additional';
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
    align: Alignment.Left,
  },
  {
    field: 'Description',
    id: 'description',
    align: Alignment.Left,
  },
  {
    field: 'Author Name',
    id: 'author',
    align: Alignment.Left,
  },
  {
    field: 'Genres',
    id: 'genres',
    align: Alignment.Left,
  },
  {
    field: 'ISBN',
    id: 'isbn',
    align: Alignment.Left,
  },
  {
    field: 'Total quantity on all stores',
    id: 'commonCount',
    align: Alignment.Left,
  },
  {
    field: 'Cover Image',
    id: 'coverImage',
    align: Alignment.Left,
  },
];
export const getFieldSettings = (
  dictionaries: DictionaryOptionI | null,
): FieldI<
  Pick<BookI, 'name' | 'description' | 'author' | 'genres' | 'isbn' | 'commonCount' | 'coverImage'>
>[] => {
  return [
    {
      name: 'name',
      isNotValid: isNotEmptyValid,
    },
    {
      name: 'description',
    },
    {
      type: FieldType.Select,
      name: 'author',
      options: dictionaries ? dictionaries.authors : [],
      isNotValid: isNotEmptyValid,
    },
    {
      type: FieldType.Select,
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
      type: FieldType.Image,
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
): FieldI<Pick<QuantityShopInfoI, 'shopId' | 'rests'>>[] => {
  return [
    {
      type: FieldType.Select,
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
    align: Alignment.Left,
  },
  {
    field: 'Count',
    id: 'rests',
    align: Alignment.Left,
  },
];
export const sortSettingsInnerTable = [];
