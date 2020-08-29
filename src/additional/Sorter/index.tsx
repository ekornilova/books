import React from 'react';
import { TableSortLabel } from '@material-ui/core';
import { arrayMoveEnd, toggleOrder, Order, FieldI } from '../index';
import { Desc, ShowSortable, SortEl } from './interfaces';

// Вовзращает новый массив сортировок
function handleSort<T>(sortable: SortEl<T>, sortables: SortEl<T>[]): SortEl<T>[] {
  // Найдем индекс сортировки
  const sortableIndex = sortables.findIndex((item) => item === sortable);
  // Сделаем клоны для неизменяемости
  const clonedSortable = { ...sortable };
  const clonedSortables = [...sortables];

  // Переключим сортировку (desc -> asc; asc -> desc)
  clonedSortable.order = toggleOrder(clonedSortable.order);
  // Поменяем старый объект сортировки на новый текущий
  clonedSortables[sortableIndex] = clonedSortable;

  // Перенес текущую сортировку в конец массива
  arrayMoveEnd(clonedSortables, sortableIndex);

  return clonedSortables;
}

// Функция компаратор, возвращающая числовые значения
function desc<T>({ a, b, orderBy, sortableFn, options }: Desc<T>): number {
  // Получаем a и b элементы из сортируемого списка данных
  const { a: aData, b: bData } = sortableFn(a, b, orderBy, options);

  // Сравнения
  if (aData > bData) {
    return -1;
  }
  if (aData < bData) {
    return 1;
  }
  return 0;
}

// Возвращает необходимую функцию для передачи
// в коллбек метода сортировки массивов (Array.prototype.sort)
// return (a, b) => number; ([].sort(getSort(props)))
function getSort<T>(
  { order, orderBy, sortableFn }: SortEl<T>,
  fieldSetting?: FieldI<T>,
): (a: T, b: T) => number {
  return (a: T, b: T) => {
    const orderValue = order === Order.Desc ? 1 : -1;
    return (
      orderValue *
      desc({ a, b, orderBy, sortableFn, options: fieldSetting && fieldSetting.options })
    );
  };
  // order === Order.Desc
  //   ? (a: T, b: T) => desc({ a, b, orderBy, sortableFn })
  //   : (a: T, b: T) => -desc({ a, b, orderBy, sortableFn });
}

// Возвращает список данных таблицы, который сортируем (в TableBody)
function stableSort<T>(list: T[], sortables: SortEl<T>[], fieldSettings: FieldI<T>[]): T[] {
  const clonedList = [...list];
  // Пройдемся по каждой сортировке и отсортируем по ней список
  sortables.forEach((sortable) => {
    const fieldSetting = (fieldSettings || []).find((item) => item.name === sortable.orderBy);
    return clonedList.sort(getSort(sortable, fieldSetting));
  });
  return clonedList;
}

// Показывает элемент сортировки, если найдет ее по полю id,
// иначе вернет просто строку поля field
function showSortable<K>({
  column,
  sortables,
  onSortHandler,
}: ShowSortable<K>): string | JSX.Element {
  const sortable = sortables.find(({ orderBy }) => orderBy === column.id);

  if (!sortable) {
    return column.field;
  }

  return (
    <TableSortLabel
      direction={sortable.order}
      onClick={onSortHandler(sortable)}
      active={sortable.orderBy === column.id}
    >
      {column.field}
    </TableSortLabel>
  );
}

export { getSort, stableSort, handleSort, showSortable, SortEl };
