import { DialogContent } from '@material-ui/core';
import styled, { css } from 'styled-components';

export const StyledDialogContent = styled(DialogContent)(({ theme }) => {
  return css`
    &.MuiDialogContent-root {
      box-sizing: border-box;
      width: 100%;
      white-space: pre-wrap;
      padding: 8px 0;
      font-family: ${theme.fontFamily}, sans-serif;
      &:first-child {
        padding-top: 8px;
      }
    }
  `;
});
