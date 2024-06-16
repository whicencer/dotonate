export interface State {
  isSuccessPopupVisible: boolean;
  isErrorPopupVisible: boolean;
  isInfoPopupVisible: boolean;
  popupContent: {
    title: string,
    message: string,
    buttonText: string,
    status: "SUCCESS" | "ERROR",
    onButtonClick?: () => void;
  },
}

export interface Action {
  type: string;
  payload?: any;
}

export enum ActionTypes {
  SHOW_SUCCESS = "SHOW_SUCCESS",
  SHOW_ERROR = "SHOW_ERROR",
  SHOW_ERROR_EMPTY = "SHOW_ERROR_EMPTY",
  HIDE_POPUP = "HIDE_POPUP",
}