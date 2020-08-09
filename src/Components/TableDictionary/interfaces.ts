import { ReactElement } from 'react';
import { Alignment } from '../../additional';
import { DataH, SortEl } from '../../additional/Sorter/interfaces';

export interface TableHeadData<K> extends DataH<K> {
  align: Alignment;
}

export type AnyObjectWithId = {
  id?: string | number;
  [key: string]: any;
};
export interface RowTableProps<T extends AnyObjectWithId> {
  isEdit?: boolean;
  handleChangeFieldInRow: (value: string | number | (string | number)[], name: keyof T) => void;
  item: T;
  fieldSettings: FieldI<T>[];
  handleSaveRow: () => void;
  handleDeleteRow?: () => void;
  handleStartEditRow?: () => void;
  handleCancelEditRow: () => void;
  isCollapsed?: boolean;
  getCollapseElement?: (item: T) => ReactElement;
  isDisabled?: boolean;
  countColumns: number;
}
export interface TableDictionaryProps<T extends AnyObjectWithId> {
  bodyList: T[];
  fieldSettings: FieldI<T>[];
  onEditRow?: (row: T) => void;
  onDeleteRow?: (row: T) => void;
  headList: TableHeadData<T>[];
  sortList: SortEl<T>[];
  className?: string;
  deleteConfirmText?: string;
  isCollapsed?: boolean;
  getCollapseElement?: (item: T) => ReactElement;
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
