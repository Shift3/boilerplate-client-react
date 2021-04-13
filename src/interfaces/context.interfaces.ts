import { ReactNode, ReducerWithoutAction } from "react";
import { ILoginResponse, LogoutUserAction, IAuthState } from "./auth.interfaces";
import { IFlashMessage, IFlashMessageState, SetFlashMessageAction } from "./flashMessage.interfaces";

export interface IAction {
    type: string
    payload: IFlashMessage | ILoginResponse | null
}

export interface IContextProps {
    state: ContextState
    dispatch: DispatchAction,
    logoutUser?: LogoutUserAction
}

export type ContextState = Record<string, unknown> | IFlashMessageState | IAuthState

export type Reducer = (state: Record<string, unknown>, action: IAction) => (Record<string, unknown>);

export type DispatchAction = ({ type, payload }: IAction) => (IAction);

export type Actions = Record<string, LogoutUserAction | SetFlashMessageAction>;

export type CreateContext = (reducer: Reducer | ReducerWithoutAction<any>, actions: Actions, initialState: Record<string, unknown>) => {
    Context: React.Context<Partial<IContextProps>>;
    Provider: ({ children }: Record<string, ReactNode>) => JSX.Element }