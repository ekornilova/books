import React, { useRef } from 'react';
import {
  CancelRounded,
  DeleteRounded,
  EditRounded,
  SaveRounded,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@material-ui/icons';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Collapse,
} from '@material-ui/core';
import styled from 'styled-components';
import { TableRowProps } from '@material-ui/core/TableRow';
import { handleSort, showSortable, stableSort } from '../../additional/Sorter';
import { AnyObjectWithId } from '../../additional';
import { TableDictionaryProps, RowTableProps } from './interfaces';
import TableCellField from './TableCellField';
import { SortEl } from '../../additional/Sorter/interfaces';
import { ScrollBar, Button } from '../BasicElements';
import { useNotifications } from '../NotificationPopup/ProviderNotification';
import { EditField } from '../Form';
import ModalWindow from '../ModalWindow';

interface StyledTableRowProps extends TableRowProps {
  isDisabled?: boolean;
  isCollapsed?: boolean;
  isEdited?: boolean;
}
const StyledTableWrapper = styled.div<{ height?: number }>`
  height: ${({ height }) => height || '50'}px;
  position: relative;
  > * {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
`;
const StyledTableRow = styled(({ isDisabled, isCollapsed, isEdited, ...props }) => (
  <TableRow {...props} />
))`
  ${(p: StyledTableRowProps) =>
    p.isEdited &&
    `
  height: 190px;
  td {
    height: 100%;
    padding: 4px;
  }
  `}
  pointer-events: ${(p: StyledTableRowProps) => p.isDisabled && 'none'};
  opacity: ${(p: StyledTableRowProps) => p.isDisabled && '.2'};
  ${(p: StyledTableRowProps) =>
    p.isCollapsed &&
    `
  & > * {
    border-bottom: unset!important;
  }`}
`;

const StyledTableCell = styled(TableCell)`
  width: 175px;
`;

const TableWrapper = styled.div`
  height: 100%;
`;
const StTable = styled(Table)`
  position: relative;
`;
const AddButton = styled(Button)`
  margin: 10px !important;
`;
const StyledImgModal = styled.img`
  max-height: 800px;
  max-width: 500px;
  width: auto;
  height: auto;
  padding: 1%;
`;
const getList = <T extends unknown>(bodyList: T[]): T[] => {
  const clonedBodyList: T[] = [...bodyList];
  return clonedBodyList;
};
export const ID_NEW_ITEM = 'new';
const isEdited = <T extends AnyObjectWithId>(edited: T | null, item: T): boolean => {
  return edited !== null && edited.id === item.id;
};
const TableRowDictionary = <T extends AnyObjectWithId>({
  isCollapsed,
  isEdit,
  getCollapseElement,
  handleCancelEditRow,
  handleDeleteRow,
  handleStartEditRow,
  handleSaveRow,
  item,
  isDisabled,
  fieldSettings,
  countColumns,
  edit,
  onChangeEdit,
  onImageClick,
}: RowTableProps<T>) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const isValidRow =
    isEdit && edit
      ? fieldSettings.every(({ name, isNotValid }) => {
          return isNotValid ? !isNotValid(edit[name]) : true;
        })
      : true;
  return (
    <>
      <StyledTableRow
        isEdited={isEdit}
        isCollapsed={isCollapsed}
        hover={!open}
        tabIndex={-1}
        isDisabled={isDisabled}
      >
        {isCollapsed && (
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        )}
        {fieldSettings.map((fieldSetting) => {
          return isEdit ? (
            <TableCell>
              {!fieldSetting.isNotEdit && (
                <EditField value={edit as T} fieldSetting={fieldSetting} onChange={onChangeEdit} />
              )}
            </TableCell>
          ) : (
            <TableCellField
              {...fieldSetting}
              value={item[fieldSetting.name]}
              onImageClick={onImageClick}
            />
          );
        })}
        {!!(handleDeleteRow || handleStartEditRow) && (
          <StyledTableCell>
            {isEdit ? (
              <>
                {isValidRow && (
                  <IconButton onClick={handleSaveRow}>
                    <SaveRounded color="primary" />
                  </IconButton>
                )}
                <IconButton onClick={handleCancelEditRow}>
                  <CancelRounded color="error" />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton onClick={handleDeleteRow}>
                  <DeleteRounded color="error" />
                </IconButton>
                <IconButton onClick={handleStartEditRow}>
                  <EditRounded color="primary" />
                </IconButton>
              </>
            )}
          </StyledTableCell>
        )}
      </StyledTableRow>
      {isCollapsed && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={countColumns}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {getCollapseElement ? getCollapseElement(item, isEdit, edit, onChangeEdit) : null}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
const TableDictionary = <T extends AnyObjectWithId>({
  headList,
  bodyList,
  onEditRow,
  onDeleteRow,
  sortList,
  fieldSettings,
  deleteConfirmText,
  isCollapsed,
  getCollapseElement,
  onAddRow,
  addButtonText,
  defaultItem,
  className,
  height = 50,
}: TableDictionaryProps<T>) => {
  const scrollRef = useRef(null);
  const { showDialogue } = useNotifications();
  const [sortables, setSortables] = React.useState<SortEl<T>[]>(sortList);
  const [edited, setEdited] = React.useState<T | null>(null);
  const [imageSrc, setImageSrc] = React.useState<string>('');
  const currentList: T[] = getList(bodyList);
  const countColumns =
    fieldSettings.length + (isCollapsed ? 1 : 0) + (onDeleteRow || onEditRow ? 1 : 0);
  const onSortHandler = (sortable: SortEl<T>): ((event: React.MouseEvent<unknown>) => void) => {
    return () => {
      setSortables(handleSort(sortable, sortables));
    };
  };

  const onHandleRemove = (item: T): (() => void) => {
    return () => {
      const tryToDelete = () => {
        if (onDeleteRow) {
          onDeleteRow(item);
        }
      };
      if (deleteConfirmText) {
        showDialogue({
          onAccept: () => {
            tryToDelete();
          },
          modalText: deleteConfirmText || '',
        });
      } else {
        tryToDelete();
      }
    };
  };

  const startEdit = (item: T): (() => void) => {
    return () => setEdited(item);
  };

  const saveData = (): void => {
    const saveFunction = edited && edited.id === ID_NEW_ITEM ? onAddRow : onEditRow;
    if (!edited && !saveFunction) {
      return;
    }
    if (saveFunction) {
      saveFunction(edited as T);
    }
    setEdited(null);
  };

  const startAdd = () => {
    if (defaultItem) {
      const newItem = {
        ...defaultItem,
        id: ID_NEW_ITEM,
      };
      setEdited(newItem);
      setTimeout(() => {
        if (scrollRef && scrollRef.current && scrollRef.current.scrollToBottom) {
          scrollRef.current.scrollToBottom();
        }
      }, 300);
    }
  };
  const cancellationData = (): void => {
    setEdited(null);
  };
  const onOpenImageWindow = (src: string) => {
    setImageSrc(src);
  };
  const onCloseImageWindow = () => {
    setImageSrc('');
  };
  const ariaLabel = isCollapsed ? 'collapsible table' : 'sticky table';
  const tableHeight = ((currentList.length || edited) && height) || 0;
  return (
    <StyledTableWrapper className={className} height={tableHeight}>
      {imageSrc && (
        <ModalWindow open={!!imageSrc} closeHandler={onCloseImageWindow}>
          <StyledImgModal src={imageSrc} />
        </ModalWindow>
      )}
      <Paper>
        <TableWrapper>
          <ScrollBar ref={scrollRef}>
            <StTable stickyHeader aria-label={ariaLabel}>
              <TableHead>
                <StyledTableRow>
                  {isCollapsed && <TableCell />}
                  {headList.map((column) => (
                    <TableCell align={column.align} key={column.id as string}>
                      {showSortable({ column, sortables, onSortHandler })}
                    </TableCell>
                  ))}
                  {!!(onDeleteRow || onEditRow) && <TableCell />}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {stableSort(currentList, sortables).map((column) => {
                  let item: T = column;
                  const isEditField = isEdited(edited, column);
                  if (edited && column.id === edited.id) {
                    item = edited;
                  }
                  const isDisabled = edited !== null && edited.id !== item.id;
                  return (
                    <TableRowDictionary
                      handleCancelEditRow={cancellationData}
                      handleSaveRow={saveData}
                      handleStartEditRow={onEditRow && startEdit(item)}
                      fieldSettings={fieldSettings}
                      handleDeleteRow={onDeleteRow && onHandleRemove(item)}
                      isDisabled={isDisabled}
                      isCollapsed={isCollapsed}
                      getCollapseElement={getCollapseElement}
                      isEdit={isEditField}
                      item={item}
                      countColumns={countColumns}
                      edit={edited}
                      onChangeEdit={setEdited}
                      onImageClick={onOpenImageWindow}
                    />
                  );
                })}
                {edited && edited.id === ID_NEW_ITEM && (
                  <TableRowDictionary
                    handleCancelEditRow={cancellationData}
                    handleSaveRow={saveData}
                    handleStartEditRow={onEditRow && startEdit(edited)}
                    fieldSettings={fieldSettings}
                    handleDeleteRow={onDeleteRow && onHandleRemove(edited)}
                    isCollapsed={isCollapsed}
                    getCollapseElement={getCollapseElement}
                    isEdit
                    item={edited}
                    countColumns={countColumns}
                    edit={edited}
                    onChangeEdit={setEdited}
                  />
                )}
              </TableBody>
            </StTable>
          </ScrollBar>
        </TableWrapper>
        {onAddRow && !edited && (
          <AddButton color="secondary" onClick={startAdd}>
            {addButtonText || '+ add row'}
          </AddButton>
        )}
      </Paper>
    </StyledTableWrapper>
  );
};

export default TableDictionary;
