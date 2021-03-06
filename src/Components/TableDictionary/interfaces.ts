import { ReactElement } from 'react';
import { Alignment, AnyObject, FieldI } from '../../additional';
import { DataH, SortEl } from '../../additional/Sorter/interfaces';

export interface TableHeadData<K> extends DataH<K> {
  align: Alignment;
}

export interface RowTableProps<T extends AnyObject> {
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
    onChange?: React.Dispatch<React.SetStateAction<T>>,
  ) => ReactElement;
  isDisabled?: boolean;
  countColumns: number;
  edit: T | null;
  onChangeEdit: React.Dispatch<React.SetStateAction<T>>;
  onImageClick?: (src: string) => void;
}
export interface TableDictionaryProps<T extends AnyObject> {
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
