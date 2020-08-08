import { DialogActions } from '@material-ui/core';
import styled from 'styled-components';

export const StyledDialogActions = styled(DialogActions)`
  &.MuiDialogActions-root {
    padding: 8px 0 0 0;
    > :not(:first-child) {
      margin-left: 16px;
    }
  }
`;
