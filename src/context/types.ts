/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
import React, { ReducerWithoutAction, ReactNode } from 'react';
import { LoginUserAction, LogoutUserAction, SetFlashMessageAction, IAction } from './actions/types';

export interface IAuthState {
  token: string | null;
  user: Record<string, unknown> | null;
}

export interface IFlashMessage {
  message: string;
  variant: string;
  timeout: number;
}

export interface IFlashMessageState {
  flashMessage: IFlashMessage | null;
}

export interface IFlashMessageContext {
  setFlashMessage: SetFlashMessageAction;
  state: IFlashMessageState;
}

export interface IAuthContext {
  loginUser: LoginUserAction;
  logoutUser: LogoutUserAction;
  state: IAuthState;
}

export type ProviderType = ({ children }: Record<string, ReactNode>) => JSX.Element;

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export type ReducerType =
  | ReducerWithoutAction<any>
  | ((state: Record<string, unknown>, action: IAction) => Record<string, unknown>);

export type CreateDataContextType = <ActionType extends Function, StateType>(
  reducer: ReducerType,
  actions: Record<string, ActionType>,
  initialState: StateType,
) => {
  // eslint-disable-next-line no-undef

  Context: React.Context<Record<string, any>>;
  Provider: ProviderType;
};
