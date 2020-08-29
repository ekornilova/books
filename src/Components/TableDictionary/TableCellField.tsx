import React from 'react';
import styled from 'styled-components';
import { TableCell } from '@material-ui/core';
import { RemoveRedEyeRounded } from '@material-ui/icons';
import { AnyObject, FieldI, FieldType, RecordType, SimpleType } from '../../additional';

const StPreviewImg = styled(RemoveRedEyeRounded)`
  cursor: pointer;
  fill: #e0e0e0;
  margin: 3%;
  :hover {
    fill: #eb5757;
  }
`;
const StTableCell = styled(TableCell)<{ onClick?: any }>`
  ${({ onClick }) => onClick && 'cursor: pointer;'}
`;
interface TableCellFieldI<T extends AnyObject> extends FieldI<T> {
  value: RecordType;
}
const TableCellField = <T extends AnyObject>({
  type = FieldType.Input,
  options = [],
  value,
  onImageClick,
  onCellClick,
}: TableCellFieldI<T> & {
  onImageClick?: (src: string) => void;
  onCellClick?: () => void;
}): React.ReactElement => {
  const onHandleImageClick = () => {
    if (onImageClick && value) {
      onImageClick(value as string);
    }
  };
  switch (type) {
    case FieldType.Select: {
      const valueArray = Array.isArray(value) ? value : [value];
      const stringValue = (valueArray as SimpleType[])
        .reduce((result: SimpleType[], item: SimpleType) => {
          const option = options.find((optionValue) => optionValue.id === item);
          if (option) {
            result.push(option.value || option.id);
          }
          return result;
        }, [])
        .join(' , ');
      return <StTableCell onClick={onCellClick}>{stringValue}</StTableCell>;
    }
    case FieldType.Image: {
      return <TableCell>{value ? <StPreviewImg onClick={onHandleImageClick} /> : <></>}</TableCell>;
    }
    default:
      return <StTableCell onClick={onCellClick}>{value as string}</StTableCell>;
  }
};
export default TableCellField;
