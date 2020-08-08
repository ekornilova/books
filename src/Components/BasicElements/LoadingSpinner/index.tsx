import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { CircularProgress } from '@material-ui/core';

export interface LoaderStylesI {
  size?: number;
  centred?: boolean;
}

export const StyledCircularProgressWrapper = styled.div<LoaderStylesI>(({ size, centred }) => {
  return css`
    width: ${size}px;
    height: ${size}px;
    ${centred &&
    `
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        `}
  `;
});

export const StyledCircularProgress = styled(CircularProgress)(({ theme }) => {
  return css`
    color: ${theme.primaryColor};
  `;
});

export interface LoaderI extends LoaderStylesI {
  visible?: boolean;
}

export const Loader: FC<LoaderI> = ({ size = 32, centred = true, visible = true }) => {
  return (
    <>
      {visible && (
        <StyledCircularProgressWrapper centred={centred} size={size}>
          <StyledCircularProgress size={size} />
        </StyledCircularProgressWrapper>
      )}
    </>
  );
};

export default Loader;
