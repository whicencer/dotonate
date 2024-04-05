"use client";

import { Dispatch, createContext, useContext, useReducer } from 'react';
import { Action, ActionTypes, State } from './types';
import { UserRoles } from '@/enums/UserRoles';

const initialState: State = {
  username: '',
  role: UserRoles.Streamer,
  tonAddress: '',
  telegramId: null
}

const RegistrationContext = createContext<[State, Dispatch<Action>]>([initialState, () => initialState]);
export const useRegistration = () => useContext(RegistrationContext);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionTypes.CHANGE_USERNAME:
      return { ...state, username: action.payload };
    case ActionTypes.CHANGE_ROLE:
      return { ...state, role: action.payload };
    case ActionTypes.CHANGE_TON_ADDRESS:
      return { ...state, tonAddress: action.payload };
    case ActionTypes.CHANGE_TELEGRAM_ID:
      return { ...state, telegramId: action.payload };
    default:
      return state;
  }
}

export const RegistrationProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RegistrationContext.Provider value={[state, dispatch]}>
      {children}
    </RegistrationContext.Provider>
  );
};
