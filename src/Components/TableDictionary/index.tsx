import React from 'react';
import { CancelRounded, DeleteRounded, EditRounded, SaveRounded } from '@material-ui/icons';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import styled from 'styled-components';
import { TableRowProps } from '@material-ui/core/TableRow';
import { handleSort, showSortable, stableSort } from '../../additional/Sorter';
import { TableDictionaryProps, AnyObjectWithId } from './interfaces';
import TableCellField from './TableCellField';
import { SortEl } from '../../additional/Sorter/interfaces';

interface StyledTableRowProps extends TableRowProps {
  isDisabled?: boolean;
}

const StyledTableRow = styled(({ isDisabled, ...props }) => <TableRow {...props} />)`
  pointer-events: ${(p: StyledTableRowProps) => p.isDisabled && 'none'};
  opacity: ${(p: StyledTableRowProps) => p.isDisabled && '.2'};
`;

const StyledTableCell = styled(TableCell)`
  width: 175px;
`;
const StyledTableBody = styled(TableBody)`
  height: 375px;
`;
const getList = <T extends unknown>(bodyList: T[]): T[] => {
  const clonedBodyList: T[] = [...bodyList];
  return clonedBodyList;
};

const isEdited = <T extends AnyObjectWithId>(edited: T | null, item: T): boolean => {
  return edited !== null && edited.id === item.id;
};

const TableDictionary = <T extends AnyObjectWithId>({
  headList,
  bodyList,
  onEditRow,
  onDeleteRow,
  sortList,
  fieldSettings,
  className,
}: TableDictionaryProps<T>) => {
  // Создаем сортировки
  const [sortables, setSortables] = React.useState<SortEl<T>[]>(sortList);
  const [edited, setEdited] = React.useState<T | null>(null);
  const currentList: T[] = getList(bodyList);

  const onSortHandler = (sortable: SortEl<T>): ((event: React.MouseEvent<unknown>) => void) => {
    return () => {
      setSortables(handleSort(sortable, sortables));
    };
  };

  const onHandleRemove = (item: T): (() => void) => {
    return () => {
      if (onDeleteRow) {
        onDeleteRow(item);
      }
    };
  };
  const handleChange = (value: string, orderBy: keyof T): void => {
    if (edited) {
      const cloneEditable = { ...edited };
      cloneEditable[orderBy] = value;
      setEdited(cloneEditable);
    }
  };

  // Запускает редактор для конкретного поля
  const startEdit = (item: T): (() => void) => {
    return () => setEdited(item);
  };

  // Сохраняет данные
  const saveData = (): void => {
    if (!edited && !onEditRow) {
      return;
    }
    if (onEditRow) {
      onEditRow(edited as T);
    }
    // const cloneBodyList = [...bodyList];
    // const bodyIndex = bodyList.findIndex(({ id }) => id === edited.id);

    // cloneBodyList[bodyIndex !== undefined ? bodyIndex : -1] = edited;

    setEdited(null);
  };

  const cancellationData = (): void => {
    setEdited(null);
  };

  return (
    <Paper className={className}>
      <Table stickyHeader>
        <TableHead>
          <StyledTableRow isDisabled={edited !== null}>
            {headList.map((column) => (
              <TableCell align={column.align} key={column.id as string}>
                {showSortable({ column, sortables, onSortHandler })}
              </TableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        {/* <ScrollBar> */}
        <StyledTableBody>
          {currentList.length === 0 ? (
            <TableCell colSpan={6} align="center">
              <>There is no data</>
            </TableCell>
          ) : (
            stableSort(currentList, sortables).map((column) => {
              let item: T = column;
              // const labelId = `enhanced-table-checkbox-${item.id}`;
              const isEditField = isEdited(edited, column);

              if (edited && column.id === edited.id) {
                item = edited;
              }

              return (
                <StyledTableRow
                  key={item.id}
                  hover
                  // role="checkbox"
                  tabIndex={-1}
                  // onClick={
                  //   edited && column.id === edited.id ? undefined : onHandleSelect(item.id)
                  // }
                  isDisabled={edited !== null && edited.id !== item.id}
                >
                  {isEditField ? (
                    <>
                      <TableCell>
                        <TextField
                          value={item.name}
                          onChange={(e) => handleChange(e.target.value, 'name')}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={item.city}
                          onChange={(e) => handleChange(e.target.value, 'city')}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={item.address}
                          onChange={(e) => handleChange(e.target.value, 'address')}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={item.phone}
                          onChange={(e) => handleChange(e.target.value, 'phone')}
                        />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      {fieldSettings.map((fieldSetting) => {
                        return <TableCellField {...fieldSetting} value={item[fieldSetting.name]} />;
                      })}
                      {/* <TableCell>{item.name}</TableCell>
                        <TableCell>{item.city}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.phone}</TableCell> */}
                    </>
                  )}

                  {isEditField ? (
                    <StyledTableCell>
                      <IconButton onClick={saveData}>
                        <SaveRounded color="primary" />
                      </IconButton>
                      <IconButton onClick={cancellationData}>
                        <CancelRounded color="error" />
                      </IconButton>
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell>
                      <IconButton onClick={onHandleRemove(item)}>
                        <DeleteRounded color="error" />
                      </IconButton>
                      <IconButton onClick={startEdit(item)}>
                        <EditRounded color="primary" />
                      </IconButton>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              );
            })
          )}
        </StyledTableBody>
        {/* </ScrollBar> */}
      </Table>
    </Paper>
  );
};

export default TableDictionary;
