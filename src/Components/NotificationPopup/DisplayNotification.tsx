import React, { useContext, FC, useEffect } from 'react';
import { Close, CheckCircleOutline } from '@material-ui/icons';
import styled from 'styled-components';
import { DialogContentText, DialogContent, Dialog, DialogTitle } from '@material-ui/core';
import {
  NotificationContext,
  NotificationI,
  NotificationContentI,
  DialogueContentI,
} from './ProviderNotification';
import { TextComponent, Button } from '../BasicElements';
import { StyledDialogActions } from '../StyledMuiComponents/StyledDialogActions';
import ModalConfirmDialogue from '../ModalConfirmDialogue';

export const BoxWrapper = styled.div`
  right: 0px;
  top: 24px;
  bottom: auto;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  position: fixed;
  z-index: 9999;
  width: 384px;
  max-width: calc(100vw - 32px);
  margin-right: 24px;
  justify-content: space-between;
`;

const NotificationHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 8px;
  color: rgba(0, 0, 0, 0.85);
`;

const NotificationTitle = styled(TextComponent)`
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  line-height: 24px;
`;

const NotificationData = styled(TextComponent)`
  font-size: 14px;
`;

const ContainerNotification = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 16px;
  padding: 16px 24px;
  overflow: hidden;
  line-height: 1.5;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  justify-content: space-between;
`;

const CloseIcon = styled(Close)`
  fill: #6b6b6b;
`;

const SuccessIcon = styled(CheckCircleOutline)`
  fill: green;
`;

const NotificationDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const SuccessNotificationView: FC<{
  notificationData: NotificationI;
  handleClose: (errorId: string) => void;
}> = ({ notificationData, handleClose }) => {
  let timer: any;
  useEffect(() => {
    timer = setTimeout(() => {
      handleClose(notificationData.id);
    }, 3000);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);
  const onCloseHandler = () => {
    if (timer) {
      clearTimeout(timer);
    }
    handleClose(notificationData.id);
  };

  const notificationContent = notificationData.content as NotificationContentI;

  return (
    <ContainerNotification>
      <SuccessIcon />
      <NotificationDataWrapper>
        <NotificationHeaderWrapper>
          <NotificationTitle text={notificationContent.title || 'Success'} />
          <CloseIcon onClick={onCloseHandler} />
        </NotificationHeaderWrapper>
        <NotificationData text={notificationContent.message} />
      </NotificationDataWrapper>
    </ContainerNotification>
  );
};
const ConfirmNotificationView: FC<{
  notificationData: NotificationI;
  handleClose: (itemId: string) => void;
}> = ({ notificationData, handleClose }) => {
  const onCloseHandler = () => {
    handleClose(notificationData.id);
  };

  const notificationContent = notificationData.content as DialogueContentI;

  return (
    <ModalConfirmDialogue
      open
      {...notificationContent}
      closeHandler={onCloseHandler}
      onReject={onCloseHandler}
    />
  );
};
const ErrorNotificationView: FC<{
  notificationData: NotificationI;
  handleClose: (errorId: string) => void;
}> = ({ notificationData, handleClose }) => {
  const onCloseHandler = () => {
    handleClose(notificationData.id);
  };

  const notificationContent = notificationData.content as NotificationContentI;

  return (
    <Dialog
      open
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
      onEscapeKeyDown={onCloseHandler}
    >
      <DialogTitle id="alert-dialog-title">Error</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {notificationContent.message}
        </DialogContentText>
      </DialogContent>
      <StyledDialogActions>
        <Button onClick={onCloseHandler} color="primary" autoFocus>
          Close
        </Button>
      </StyledDialogActions>
    </Dialog>
  );
};

const getNotificationComponent = (componentName: string) => {
  switch (componentName) {
    case 'error':
      return ErrorNotificationView;
    case 'dialogue':
      return ConfirmNotificationView;
    default:
      return SuccessNotificationView;
  }
};

const DisplayNotification: any = (): any => {
  const { notifications, dispatch }: any = useContext(NotificationContext);

  const handleClose = (id: string) => {
    dispatch({
      type: 'delete',
      data: {
        id,
      },
    });
  };

  return (
    <>
      <BoxWrapper>
        {notifications.map((notificationData: NotificationI) => {
          const NotificationComponent = getNotificationComponent(notificationData.type);
          return (
            <NotificationComponent
              key={notificationData.id}
              handleClose={handleClose}
              notificationData={notificationData}
            />
          );
        })}
      </BoxWrapper>
    </>
  );
};

export default DisplayNotification;
