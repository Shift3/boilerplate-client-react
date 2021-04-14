import { Dispatch } from 'react';
import { IAction } from './context.interfaces';
export interface IAuthState {
    token: string | null
}

export interface ILoginResponse {
    token: string,
    user: Record<string, unknown>
}

export type LogoutUserAction = (dispatch: Dispatch<IAction>) => (payload: null) => void;
export type LoginUserAction = (dispatch: Dispatch<IAction>) => (payload: ILoginResponse) => Promise<void>


