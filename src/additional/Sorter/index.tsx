import React from 'react';
import { TableSortLabel } from '@material-ui/core';
import { arrayMoveEnd, toggleOrder } from '../index';
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
function desc<T>({ a, b, orderBy, sortableFn }: Desc<T>): number {
  // Получаем a и b элементы из сортируемого списка данных
  const { a: aData, b: bData } = sortableFn(a, b, orderBy);

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
function getSort<T>({ order, orderBy, sortableFn }: SortEl<T>): (a: T, b: T) => number {
  return order === 'desc'
    ? (a: T, b: T) => desc({ a, b, orderBy, sortableFn })
    : (a: T, b: T) => -desc({ a, b, orderBy, sortableFn });
}

// Возвращает список данных таблицы, который сортируем (в TableBody)
function stableSort<T>(list: T[], sortables: SortEl<T>[]): T[] {
  const clonedList = [...list];

  // Пройдемся по каждой сортировке и отсортируем по ней список
  sortables.forEach((sortable) => clonedList.sort(getSort(sortable)));

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
