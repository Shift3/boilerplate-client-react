import { DispatchAction, IAction } from './context.interface';

export interface IAuthState {
    token: string | null
}

export type LogoutUser = (dispatch: DispatchAction) => Promise<IAction>;