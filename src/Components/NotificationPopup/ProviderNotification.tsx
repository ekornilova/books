import React, { createContext, useReducer, useContext } from 'react';
import shortid from 'shortid';
import update from 'immutability-helper';

export enum NotificationType {
  Error,
  Success,
  Dialogue,
}
// export type NotificationType = 'error' | 'success' | 'dialogue';
export interface BaseDialogueI {
  onReject?(): void;
  modalText?: string;
  headerName?: string;
  acceptButtonLabel?: string;
  rejectButtonLabel?: string;
}

export interface DialogueContentI extends BaseDialogueI {
  onAccept(): void;
}

export interface NotificationContentI {
  message: string;
  title?: string;
}

export interface NotificationI {
  content: NotificationContentI;
  type: NotificationType;
  id: string;
}

export interface NotificationContextI {
  notifications: NotificationI[];
  dispatch: React.Dispatch<{ type: string; data: any }>;
  handleAxiosError(error: any): any;
  handleAxiosSuccess(message: string, title?: string): any;
  showDialogue(dialogueContent: DialogueContentI): any;
}

export const NotificationContext = createContext<NotificationContextI>({
  notifications: [],
  dispatch: (): any => {},
  handleAxiosError: (): any => {},
  handleAxiosSuccess: (): any => {},
  showDialogue: (): any => {},
});

export const NotificationsProvider = ({ children }: any) => {
  const initialState = { errors: [], notifications: [] };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'create': {
        const newNotification = {
          content: action.data.content,
          type: action.data.type,
          id: shortid.generate(),
        };

        return {
          notifications: [...state.notifications, newNotification],
        };
      }
      case 'delete': {
        const notificationIdx = state.notifications.findIndex(
          (item: NotificationI) => item.id === action.data.id,
        );
        if (notificationIdx !== undefined) {
          const updatedNotifications = update(state.notifications, {
            $splice: [[notificationIdx, 1]],
          });
          return { notifications: updatedNotifications };
        }
        return state;
      }
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAxiosError = ({ response }: any) => {
    let message = 'Unknown error';
    if (response) {
      switch (true) {
        case response.status === 403:
        case response.status === 401:
          message = 'No access';
          break;
        case typeof response.message === 'string':
          message = response.message;
          break;
        case Boolean(response.data && response.data.message):
          message = response.data.message;
          break;
        case typeof response.data === 'string':
          message = response.data;
          break;
        default:
          message = 'Unknown error';
          break;
      }
    }

    dispatch({ type: 'create', data: { content: { message }, type: NotificationType.Error } });
  };

  const handleAxiosSuccess = (message: string, title?: string) => {
    dispatch({
      type: 'create',
      data: { content: { message, title }, type: NotificationType.Success },
    });
  };
  const showDialogue = (dialogueContent: DialogueContentI) => {
    dispatch({
      type: 'create',
      data: { content: dialogueContent, type: NotificationType.Dialogue },
    });
  };
  return (
    <NotificationContext.Provider
      value={{
        notifications: state.notifications,
        dispatch,
        handleAxiosError,
        handleAxiosSuccess,
        showDialogue,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const notifications = useContext(NotificationContext);
  if (!notifications) {
    throw Error("notifications shouldn't be null");
  }
  return notifications;
};
