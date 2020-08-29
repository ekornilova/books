import React, { createContext, useReducer, useContext, FunctionComponent } from 'react';
import shortid from 'shortid';
import update from 'immutability-helper';

export enum NotificationType {
  Error,
  Success,
  Dialogue,
}
// export enum ActionType {
//   Create,
//   Delete
// }
export type ActionType = 'create' | 'delete';

interface ResponseData {
  message?: string;
}
interface ResponseWithError {
  response: {
    status: number;
    message?: string;
    data?: ResponseData | string;
  };
}
export type ActionDataSuccessError = {
  type: NotificationType.Error | NotificationType.Success;
  content: {
    message: string;
    title?: string;
  };
};
export type ActionDataDialogue = {
  type: NotificationType.Dialogue;
  content: DialogueContentI;
};
export type ActionCreateData = ActionDataSuccessError | ActionDataDialogue;
export type ActionDeleteData = {
  id: string;
};
export type ActionCreateI = {
  type: 'create';
  data: ActionCreateData;
};
export type ActionDeleteI = {
  type: 'delete';
  data: ActionDeleteData;
};
export type ActionI = ActionDeleteI | ActionCreateI;
export type DispatchI = React.Dispatch<ActionI>;
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
  content: NotificationContentI | DialogueContentI;
  type: NotificationType;
  id: string;
}
export type StateI = {
  notifications: NotificationI[];
};
export interface NotificationContextI {
  notifications: NotificationI[];
  dispatch: DispatchI;
  handleAxiosError(error: ResponseWithError): void;
  handleAxiosSuccess(message: string, title?: string): void;
  showDialogue(dialogueContent: DialogueContentI): void;
}

export const NotificationContext = createContext<NotificationContextI>({
  notifications: [],
  dispatch: () => {},
  handleAxiosError: () => {},
  handleAxiosSuccess: () => {},
  showDialogue: () => {},
});

export const NotificationsProvider: FunctionComponent = ({ children }) => {
  const initialState = { notifications: [] };

  const reducer = (state: StateI, action: ActionI) => {
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
        return state;
      // throw new Error();
    }
  };

  const [state, dispatch]: [StateI, DispatchI] = useReducer(reducer, initialState);

  const handleAxiosError = ({ response }: ResponseWithError) => {
    let message = 'Unknown error';
    if (response) {
      switch (true) {
        case response.status === 403:
        case response.status === 401:
          message = 'No access';
          break;
        case typeof response.message === 'string':
          message = response.message || '';
          break;
        case Boolean(response.data && (response.data as ResponseData).message):
          message = (response.data as ResponseData).message || '';
          break;
        case typeof response.data === 'string':
          message = response.data as string;
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
