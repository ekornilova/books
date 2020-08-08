import React from 'react';
import { TableCell } from '@material-ui/core';
import { FieldI, AnyObjectWithId } from './interfaces';

interface TableCellFieldI<T extends AnyObjectWithId> extends FieldI<T> {
  value: string | number | (string | number)[];
}
const TableCellField = <T extends AnyObjectWithId>({
  type = 'input',
  options = [],
  value,
}: TableCellFieldI<T>) => {
  switch (type) {
    case 'select': {
      const valueArray = Array.isArray(value) ? value : [value];
      const stringValue = (valueArray as (string | number)[])
        .reduce((result: (string | number)[], item: string | number) => {
          const option = options.find((optionValue) => optionValue.id === item);
          if (option) {
            result.push(option.value || option.id);
          }
          return result;
        }, [])
        .join(' , ');
      return <TableCell>{stringValue}</TableCell>;
    }
    default:
      return <TableCell>{value as string}</TableCell>;
  }
};
export default TableCellField;
