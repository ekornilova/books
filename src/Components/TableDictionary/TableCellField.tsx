import React from 'react';
import styled from 'styled-components';
import { TableCell } from '@material-ui/core';
import { RemoveRedEyeRounded } from '@material-ui/icons';
import { AnyObjectWithId, FieldI } from '../../additional';

const StPreviewImg = styled(RemoveRedEyeRounded)`
  cursor: pointer;
  fill: #e0e0e0;
  margin: 3%;
  :hover {
    fill: #eb5757;
  }
`;
interface TableCellFieldI<T extends AnyObjectWithId> extends FieldI<T> {
  value: string | number | (string | number)[];
}
const TableCellField = <T extends AnyObjectWithId>({
  type = 'input',
  options = [],
  value,
  onImageClick,
}: TableCellFieldI<T> & {
  onImageClick?: (src: string) => void;
}) => {
  const onHandleImageClick = () => {
    if (onImageClick && value) {
      onImageClick(value as string);
    }
  };
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
    case 'image': {
      return <TableCell>{value && <StPreviewImg onClick={onHandleImageClick} />}</TableCell>;
    }
    default:
      return <TableCell>{value as string}</TableCell>;
  }
};
export default TableCellField;
