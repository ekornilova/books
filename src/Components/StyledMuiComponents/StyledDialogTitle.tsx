import { DialogTitle } from '@material-ui/core';
import styled from 'styled-components';

export const StyledDialogTitle = styled(DialogTitle)`
  &.MuiDialogTitle-root {
    position: relative;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .MuiTypography-root {
    padding: 7px;
  }
`;
