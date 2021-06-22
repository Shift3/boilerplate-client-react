import { Dispatch } from 'react';

export type DispatchAction = ({ type, payload }: IAction) => IAction;

export interface IAction {
  type: string;
  payload: ILoginResponse | null;
}

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
