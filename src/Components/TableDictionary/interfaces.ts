import { Alignment } from '../../additional';
import { DataH, SortEl } from '../../additional/Sorter/interfaces';

export interface TableHeadData<K> extends DataH<K> {
  align: Alignment;
}

export type AnyObjectWithId = {
  id?: string | number;
  [key: string]: any;
};
export interface TableDictionaryProps<T extends AnyObjectWithId> {
  bodyList: T[];
  fieldSettings: FieldI<T>[];
  onEditRow?: (row: T) => void;
  onDeleteRow?: (row: T) => void;
  headList: TableHeadData<T>[];
  sortList: SortEl<T>[];
  className?: string;
}
export type FieldType = 'input' | 'select';
export interface OptionI {
  id: string | number;
  value?: string | number;
}
export interface FieldI<T extends AnyObjectWithId> {
  type?: FieldType;
  options?: OptionI[];
  defaultValue?: string | number;
  name: keyof T;
}
