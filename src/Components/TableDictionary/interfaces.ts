import { ReactElement } from 'react';
import { Alignment, AnyObjectWithId, FieldI } from '../../additional';
import { DataH, SortEl } from '../../additional/Sorter/interfaces';

export interface TableHeadData<K> extends DataH<K> {
  align: Alignment;
}

export interface RowTableProps<T extends AnyObjectWithId> {
  isEdit?: boolean;
  item: T;
  fieldSettings: FieldI<T>[];
  handleSaveRow: () => void;
  handleDeleteRow?: () => void;
  handleStartEditRow?: () => void;
  handleCancelEditRow: () => void;
  isCollapsed?: boolean;
  getCollapseElement?: (
    item: T,
    isEdit?: boolean,
    edited?: T | null,
    onChange?: any,
  ) => ReactElement;
  isDisabled?: boolean;
  countColumns: number;
  edit: T | null;
  onChangeEdit: any;
  onImageClick?: (src: string) => void;
}
export interface TableDictionaryProps<T extends AnyObjectWithId> {
  bodyList: T[];
  fieldSettings: FieldI<T>[];
  onEditRow?: (row: T) => void;
  onDeleteRow?: (row: T) => void;
  onAddRow?: (row: T) => void;
  headList: TableHeadData<T>[];
  sortList: SortEl<T>[];
  className?: string;
  deleteConfirmText?: string;
  isCollapsed?: boolean;
  getCollapseElement?: (item: T) => ReactElement;
  addButtonText?: string;
  defaultItem?: T;
  height?: number;
  isInner?: boolean;
}
