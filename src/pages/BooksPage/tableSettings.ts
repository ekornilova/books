import { sortableFn } from '../../additional/Sorter/helper';
import { DictionaryI } from '../../store/types';
import { BookI } from '../../utils/book';
import { QuantityShopInfoI } from '../../utils/dictionaries/interface';
import { FieldI } from '../../Components/TableDictionary/interfaces';
import { Alignment, Order } from '../../additional';

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
  //   {
  //     order: 'desc' as Order,
  //     orderBy: 'commonCount',
  //     sortableFn,
  //   }
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

export const getFieldSettings = (dictionaries: DictionaryI | null): FieldI<BookI>[] => {
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
      options: dictionaries
        ? dictionaries.authors.map(({ id, firstName, lastName }) => {
            return {
              id,
              value: `${firstName} ${lastName}`,
            };
          })
        : [],
    },
    {
      type: 'select',
      name: 'genres',
      options: dictionaries
        ? dictionaries.genres.map(({ id, name }) => {
            return {
              id,
              value: name,
            };
          })
        : [],
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
export const getFieldSettingsInnerTable = (
  dictionaries: DictionaryI | null,
): FieldI<QuantityShopInfoI>[] => {
  return [
    {
      type: 'select',
      name: 'shopId',
      options: dictionaries
        ? dictionaries.shops.map(({ id, name }) => {
            return {
              id,
              value: name,
            };
          })
        : [],
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
