import React, { FC } from 'react';
import ModalWindow, { ModalWindowI } from '../ModalWindow';
import { Button } from '../BasicElements';
import { StyledDialogActions, StyledDialogContent } from '../StyledMuiComponents';

export interface ModalConfirmDialogueI extends ModalWindowI {
  onAccept(): void;
  onReject(): void;
  modalText?: string;
  acceptButtonLabel?: string;
  rejectButtonLabel?: string;
}

export const ModalConfirmDialogue: FC<ModalConfirmDialogueI> = ({
  onReject,
  onAccept,
  headerName = 'Сonfirmation',
  modalText = '',
  acceptButtonLabel = 'Confirm',
  rejectButtonLabel = 'Cancel',
  closeHandler,
  open = true,
  ...rest
}) => {
  const onAcceptButtonClick = () => {
    onAccept();
    closeHandler();
  };

  const onRejectButtonClick = () => {
    onReject();
    closeHandler();
  };

  return (
    <ModalWindow open={open} closeHandler={closeHandler} headerName={headerName} {...rest}>
      {modalText && <StyledDialogContent>{modalText}</StyledDialogContent>}
      <StyledDialogActions>
        <Button onClick={onRejectButtonClick}>{rejectButtonLabel}</Button>
        <Button onClick={onAcceptButtonClick}>{acceptButtonLabel}</Button>
      </StyledDialogActions>
    </ModalWindow>
  );
};

export default ModalConfirmDialogue;
