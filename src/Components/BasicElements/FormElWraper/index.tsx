import React, { FC } from 'react';
import { FormControl } from '@material-ui/core';
import styled from 'styled-components';
import Label from '../Label';

const STForm = styled(({ noMargin, ...props }) => {
  return <FormControl {...props} />;
})``;

const FormElWraper: FC<{
  noMargin?: boolean;
  labelText?: string;
  className?: string;
}> = ({ className, labelText, noMargin, children }) => {
  return (
    <STForm noMargin={noMargin} className={className}>
      {labelText && <Label text={labelText} />}
      {children}
    </STForm>
  );
};
export default FormElWraper;
