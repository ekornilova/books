import React, { createContext, useReducer, useContext, FunctionComponent } from 'react';

import update from 'immutability-helper';
import shortid from 'shortid';
import {
  NotificationI,
  ActionDeleteI,
  ActionCreateI,
  ResponseData,
  ResponseWithError,
  NotificationType,
  DialogueContentI,
} from './notifications';
import { ActionSetDictionaries, DictionaryI } from './dictionaries';
import { ActionSetBooks } from './books';
import { BookI } from '../utils/book';
import { SETDICTIONARIES, SETBOOKS } from './constants';

export type ActionI = ActionDeleteI | ActionCreateI | ActionSetDictionaries | ActionSetBooks;
export type DispatchI = React.Dispatch<ActionI>;
export type StateI = {
  notifications: NotificationI[];
  books: BookI[];
  dictionaries: DictionaryI | null;
};
export interface ContextI {
  notifications: NotificationI[];
  dispatch: DispatchI;
  handleAxiosError(error: ResponseWithError): void;
  handleAxiosSuccess(message: string, title?: string): void;
  showDialogue(dialogueContent: DialogueContentI): void;
  setBooks(books: BookI[]): void;
  setDictionaries(data: DictionaryI): void;
  books: BookI[];
  dictionaries: DictionaryI | null;
}
export const Context = createContext<ContextI>({
  notifications: [],
  dictionaries: null,
  books: [],
  dispatch: () => {},
  handleAxiosError: () => {},
  handleAxiosSuccess: () => {},
  showDialogue: () => {},
  setBooks: () => {},
  setDictionaries: () => {},
});

const ContextProvider: FunctionComponent = ({ children }) => {
  const initialState = { notifications: [], dictionaries: null, books: [] };
  const reducer = (state: StateI, action: ActionI) => {
    switch (action.type) {
      case 'create': {
        const newNotification = {
          content: action.data.content,
          type: action.data.type,
          id: shortid.generate(),
        };
        console.log('newNotification', newNotification);
        return {
          ...state,
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
          return {
            ...state,
            notifications: updatedNotifications,
          };
        }
        return state;
      }
      case SETDICTIONARIES: {
        return {
          ...state,
          dictionaries: action.data,
        };
      }
      case SETBOOKS: {
        return {
          ...state,
          books: action.data,
        };
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
  const setBooks = (books: BookI[]) => {
    dispatch({
      type: SETBOOKS,
      data: books,
    });
  };
  const setDictionaries = (data: DictionaryI) => {
    dispatch({
      type: SETDICTIONARIES,
      data,
    });
  };
  return (
    <Context.Provider
      value={{
        notifications: state.notifications,
        dictionaries: state.dictionaries,
        books: state.books,
        dispatch,
        handleAxiosError,
        handleAxiosSuccess,
        showDialogue,
        setBooks,
        setDictionaries,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useStore = () => {
  const notifications = useContext(Context);
  if (!notifications) {
    throw Error("notifications shouldn't be null");
  }
  return notifications;
};

export default ContextProvider;
