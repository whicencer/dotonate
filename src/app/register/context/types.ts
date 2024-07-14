import { UserRoles } from "@/enums/UserRoles";

export enum ActionTypes {
  CHANGE_USERNAME = "CHANGE_USERNAME",
  CHANGE_ROLE = "CHANGE_ROLE",
  CHANGE_TELEGRAM_ID = "CHANGE_TELEGRAM_ID",
}

export interface Action {
  type: ActionTypes;
  payload: any;
}

export interface State {
  username: string;
  role: UserRoles;
  telegramId: number | null;
}