import { Order } from '../index';

// Интерфейс функции компаратора для сортировки конкретного поля
export interface SortHandler<K> {
  sortableFn(a: K, b: K, orderBy: keyof K): { a: number; b: number };
}

// Интерфейс элемента сортировки
export interface SortEl<K> extends SortHandler<K> {
  order: Order;
  orderBy: keyof K;
}

// Интерфейс для функции компаратора
export interface Desc<T> extends SortHandler<T> {
  a: T;
  b: T;
  orderBy: keyof T;
}

// Интерфейс для полей шапки таблицы; id - поле из сортируемых данных
type FieldsData<K> = Exclude<K, 'id'>;

export interface DataH<K> {
  id: keyof FieldsData<K>;
  field: string;
}

// Интерфейс для функции, возвращаю элемент или строку, если сортировки не нашлось
export interface ShowSortable<K> {
  column: DataH<K>;
  sortables: SortEl<K>[];

  onSortHandler(sortable: SortEl<K>): (event: React.MouseEvent<unknown>) => void;
}
