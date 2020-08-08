import { DialogContent } from '@material-ui/core';
import styled from 'styled-components';

export const StyledDialogContent = styled(DialogContent)`
  &.MuiDialogContent-root {
    box-sizing: border-box;
    width: 100%;
    white-space: pre-wrap;
    padding: 8px 0;
    &:first-child {
      padding-top: 8px;
    }
  }
`;
