import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { Close } from '@material-ui/icons';
import { StyledDialogTitle } from '../StyledMuiComponents';
import StyledScrollbar from '../BasicElements/ScrollBar';

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  outline: 0;
  overflow: hidden;
`;

const PreViewWrapper = styled.div<{ width?: number; height?: number }>`
  ${(props) => {
    const { width, height } = props;
    return css`
      height: ${height ? `${height}px` : '400px'};
      margin: 0 auto;
      position: relative;
      width: 90%;
      max-width: ${width || '520'}px;
      top: 50%;
      transform: translateY(-50%);
      max-height: 80vh;
      background-color: white;
      box-shadow: 0px 4px 40px rgba(34, 34, 34, 0.1);
      border-radius: 4px;
      padding: 40px 16px 40px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      * {
        box-sizing: border-box;
      }
      .MuiDialogTitle-root {
      }

      .MuiTableRow-root {
        background-color: #fafafa;
      }
      .MuiTableBody-root .MuiTableRow-root.MuiTableRow-hover:hover {
        background-color: #ffffff;
      }
      .MuiTableRow-root .MuiFab-extended.MuiFab-sizeSmall {
        // box-sizing: border-box;
        background-color: #ffffff;
        font-size: 14px;
        border: 2px solid #cacaca;
        color: #494949;
        box-shadow: none;
        font-weight: bold;
        padding: 4px 12px;
        :hover {
          border: 2px solid #494949;
        }
      }
    `;
  }}
`;

const StyledClose = styled(Close)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  fill: #6b6b6b;
  padding: 1px;
  cursor: pointer;
`;

export interface ModalWindowI {
  open: boolean;
  closeHandler: () => void;
  width?: number;
  height?: number;
  headerName?: string;
  className?: string;
}

const ModalWindow: FC<ModalWindowI> = ({
  open,
  closeHandler,
  children,
  width,
  height,
  headerName,
  className,
}) => {
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={closeHandler}
    >
      <Container>
        <PreViewWrapper width={width} height={height} className={className}>
          <StyledScrollbar>
            <StyledDialogTitle>
              {headerName}
              <StyledClose onClick={closeHandler} />
            </StyledDialogTitle>
            {children}
          </StyledScrollbar>
        </PreViewWrapper>
      </Container>
    </Modal>
  );
};
export default ModalWindow;
