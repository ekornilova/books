import React, { FC } from 'react';
import { Input, InputProps, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormElWraper from '../FormElWraper';

export const SearchIconComp: FC<{ className?: string; position?: 'end' | 'start' }> = ({
  className,
  position = 'end',
}) => {
  return (
    <InputAdornment className={className} position={position}>
      <SearchIcon />
    </InputAdornment>
  );
};

export interface InputInterface {
  noMargin?: boolean;
  isInput?: boolean;
  labelText?: string;
  className?: string;
  forForm?: boolean;
}

const InputComponent: FC<InputInterface & InputProps> = ({
  noMargin,
  isInput,
  className,
  labelText,
  forForm,
  ...otherProps
}) => {
  const inputComp = isInput ? (
    <Input className={forForm ? '' : className} {...otherProps} />
  ) : (
    <TextField className={forForm ? '' : className} {...otherProps} />
  );
  return forForm ? (
    <FormElWraper noMargin={noMargin} className={className} labelText={labelText}>
      {inputComp}
    </FormElWraper>
  ) : (
    inputComp
  );
};
export default InputComponent;
