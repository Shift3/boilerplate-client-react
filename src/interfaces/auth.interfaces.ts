import { Dispatch } from 'react';
import { IAction } from './context.interfaces';
export interface IAuthState {
    token: string | null
}

export interface ILoginResponse {
    token: string,
    user: Record<string, unknown>
}

export type LogoutUserAction = (dispatch: Dispatch<IAction>) => (payload: null) => Promise<void>;
export type LoginuserAction = (dispatch: Dispatch<IAction>) => (payload: ILoginResponse) => Promise<void>


