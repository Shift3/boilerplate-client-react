import { Dispatch } from 'react';
import { IFlashMessage } from '../types';

export type DispatchAction = ({ type, payload }: IAction) => IAction;

export interface IAction {
  type: string;
  payload: IFlashMessage | ILoginResponse | null;
}

// FLASH MESSAGE
export type SetFlashMessageAction = (dispatch: Dispatch<IAction>) => (payload: IFlashMessage) => void;

export type FlashMessageActionType = SetFlashMessageAction;

// AUTH
export interface ILoginResponse {
  token: string;
  user: Record<string, unknown>;
}

export interface ILoginFormPayload {
  username: string;
  password: string;
}

export type LogoutUserAction = (dispatch: Dispatch<IAction>) => (payload: null) => void;

export type LoginUserAction = (dispatch: Dispatch<IAction>) => (payload: ILoginFormPayload) => Promise<void>;

export type AuthActionType = LogoutUserAction | LoginUserAction;
