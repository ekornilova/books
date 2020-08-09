import React from 'react';
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
  TextField,
  Collapse,
} from '@material-ui/core';
import styled from 'styled-components';
import { TableRowProps } from '@material-ui/core/TableRow';
import { handleSort, showSortable, stableSort } from '../../additional/Sorter';
import { TableDictionaryProps, AnyObjectWithId, RowTableProps } from './interfaces';
import TableCellField from './TableCellField';
import { SortEl } from '../../additional/Sorter/interfaces';
import { ScrollBar } from '../BasicElements';
import { useNotifications } from '../NotificationPopup/ProviderNotification';

interface StyledTableRowProps extends TableRowProps {
  isDisabled?: boolean;
  isCollapsed?: boolean;
}

const StyledTableRow = styled(({ isDisabled, isCollapsed, ...props }) => <TableRow {...props} />)`
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
const getList = <T extends unknown>(bodyList: T[]): T[] => {
  const clonedBodyList: T[] = [...bodyList];
  return clonedBodyList;
};

const isEdited = <T extends AnyObjectWithId>(edited: T | null, item: T): boolean => {
  return edited !== null && edited.id === item.id;
};
const TableRowDictionary = <T extends AnyObjectWithId>({
  isCollapsed,
  isEdit,
  getCollapseElement,
  handleCancelEditRow,
  handleChangeFieldInRow,
  handleDeleteRow,
  handleStartEditRow,
  handleSaveRow,
  item,
  isDisabled,
  fieldSettings,
  countColumns,
}: RowTableProps<T>) => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <StyledTableRow isCollapsed={isCollapsed} hover={!open} tabIndex={-1} isDisabled={isDisabled}>
        {isCollapsed && (
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        )}
        {isEdit ? (
          <>
            <TableCell>
              <TextField
                value={item.name}
                onChange={(e) => handleChangeFieldInRow(e.target.value, 'name')}
              />
            </TableCell>
            <TableCell>
              <TextField
                value={item.city}
                onChange={(e) => handleChangeFieldInRow(e.target.value, 'city')}
              />
            </TableCell>
            <TableCell>
              <TextField
                value={item.address}
                onChange={(e) => handleChangeFieldInRow(e.target.value, 'address')}
              />
            </TableCell>
            <TableCell>
              <TextField
                value={item.phone}
                onChange={(e) => handleChangeFieldInRow(e.target.value, 'phone')}
              />
            </TableCell>
          </>
        ) : (
          <>
            {fieldSettings.map((fieldSetting) => {
              return <TableCellField {...fieldSetting} value={item[fieldSetting.name]} />;
            })}
          </>
        )}
        {!!(handleDeleteRow || handleStartEditRow) && (
          <StyledTableCell>
            {isEdit ? (
              <>
                <IconButton onClick={handleSaveRow}>
                  <SaveRounded color="primary" />
                </IconButton>
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
              {getCollapseElement ? getCollapseElement(item) : null}
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
  className,
  deleteConfirmText,
  isCollapsed,
  getCollapseElement,
}: TableDictionaryProps<T>) => {
  const { showDialogue } = useNotifications();
  const [sortables, setSortables] = React.useState<SortEl<T>[]>(sortList);
  const [edited, setEdited] = React.useState<T | null>(null);
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
      showDialogue({
        onAccept: () => {
          if (onDeleteRow) {
            onDeleteRow(item);
          }
        },
        modalText: deleteConfirmText || '',
      });
    };
  };
  const handleChange = (value: string | number | (string | number)[], orderBy: keyof T): void => {
    if (edited) {
      const cloneEditable = { ...edited };
      cloneEditable[orderBy] = value;
      setEdited(cloneEditable);
    }
  };

  const startEdit = (item: T): (() => void) => {
    return () => setEdited(item);
  };

  const saveData = (): void => {
    if (!edited && !onEditRow) {
      return;
    }
    if (onEditRow) {
      onEditRow(edited as T);
    }
    setEdited(null);
  };

  const cancellationData = (): void => {
    setEdited(null);
  };
  const ariaLabel = isCollapsed ? 'collapsible table' : 'sticky table';
  return (
    <Paper className={className}>
      <TableWrapper>
        <ScrollBar>
          <StTable stickyHeader aria-label={ariaLabel}>
            <TableHead>
              <StyledTableRow isDisabled={edited !== null}>
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
              {
                // currentList.length === 0 ? (
                //   <TableCell colSpan={countColumns} align="center">
                //     <>There is no data</>
                //   </TableCell>
                // ) : (
                stableSort(currentList, sortables).map((column) => {
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
                      handleChangeFieldInRow={handleChange}
                      countColumns={countColumns}
                    />
                  );
                })
                // )
              }
            </TableBody>
          </StTable>
        </ScrollBar>
      </TableWrapper>
    </Paper>
  );
};

export default TableDictionary;
