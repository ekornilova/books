import { DialogTitle } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { memo } from 'react';

export const StyledDialogTitle = styled(memo(DialogTitle))(({ theme }) => {
  return css`
    &.MuiDialogTitle-root {
      position: relative;
      padding: 0;
      display: flex;
      justify-content: space-between;
      h2 {
        font-size: ${theme.modalWindow.title.fontSize};
        line-height: ${theme.modalWindow.title.lineHeight};
        letter-spacing: ${theme.modalWindow.title.letterSpacing};
      }
    }
  `;
});
