export interface ResponseData {
  message?: string;
}
export interface ResponseWithError {
  response: {
    status: number;
    message?: string;
    data?: ResponseData | string;
  };
}
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
