import { sortableFn } from '../../additional/Sorter/helper';
import { BookI } from '../../utils/book';
import { QuantityShopInfoI } from '../../utils/dictionaries/interface';
import { Alignment, Order, FieldI, OptionI } from '../../additional';

export const sortSettings = [
  {
    order: 'desc' as Order,
    orderBy: 'name',
    sortableFn,
  },
  {
    order: 'desc' as Order,
    orderBy: 'author',
    sortableFn,
  },
  {
    order: 'desc' as Order,
    orderBy: 'isbn',
    sortableFn,
  },
  {
    order: 'desc' as Order,
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
    field: 'Cover Image',
    id: 'coverImage',
    align: 'left' as Alignment,
  },
  {
    field: 'Total quantity on all stores',
    id: 'commonCount',
    align: 'left' as Alignment,
  },
];

export const getFieldSettings = (dictionaries: DictionaryOptionI | null): FieldI<BookI>[] => {
  return [
    {
      name: 'name',
    },
    {
      name: 'description',
    },
    {
      type: 'select',
      name: 'author',
      options: dictionaries ? dictionaries.authors : [],
    },
    {
      type: 'select',
      name: 'genres',
      options: dictionaries ? dictionaries.genres : [],
    },
    {
      name: 'isbn',
    },
    {
      name: 'coverImage',
    },
    {
      name: 'commonCount',
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
    },
    {
      name: 'rests',
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
