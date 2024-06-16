import { Action, ActionTypes, State } from "./types";

export const popupInitState: State = {
  isSuccessPopupVisible: false,
  isErrorPopupVisible: false,
  isInfoPopupVisible: false,
  popupContent: {
    title: "",
    message: "",
    buttonText: "",
    status: "ERROR",
  },
};

export const popupReducer = (state: State = popupInitState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SHOW_SUCCESS:
      return {
        ...state,
        isSuccessPopupVisible: true,
        popupContent: {
          status: "SUCCESS",
          title: "Success",
          buttonText: "Go to profile",
          message: "Answer has been sent",
          onButtonClick: action.payload,
        }
      };
    case ActionTypes.SHOW_ERROR:
      return {
        ...state,
        isErrorPopupVisible: true,
        popupContent: {
          status: "ERROR",
          title: "Error",
          buttonText: "Close",
          message: "Failed to send answer",
          onButtonClick: action.payload,
        }
      };
    case ActionTypes.SHOW_ERROR_EMPTY:
      return {
        ...state,
        isInfoPopupVisible: true,
        popupContent: {
          status: "ERROR",
          title: "Answer can't be empty",
          buttonText: "Close",
          message: "Try again",
          onButtonClick: action.payload,
        }
      };
    case ActionTypes.HIDE_POPUP:
      return {
        ...state,
        isSuccessPopupVisible: false,
        isErrorPopupVisible: false,
        isInfoPopupVisible: false,
        popupContent: popupInitState.popupContent
      };
    default:
      return state;
  }
}