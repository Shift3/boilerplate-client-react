import { ReactNode, ReducerWithoutAction } from "react";
import { ILoginResponse, LogoutUserAction, IAuthState, LoginUserAction } from "./auth.interfaces";
import { IFlashMessage, IFlashMessageState, SetFlashMessageAction } from "./flashMessage.interfaces";

export interface IAction {
    type: string
    payload: IFlashMessage | ILoginResponse | null
}

export interface IAuthContext {
    loginUser: LoginUserAction
    logoutUser: LogoutUserAction
    state: IAuthState
}

export interface IFlashMessageContext {
    setFlashMessage: SetFlashMessageAction
    state: IFlashMessageState
}

export type LocalContext = Record<string, unknown> | IAuthContext | IFlashMessageContext;

export type ContextState = Record<string, unknown> | IFlashMessageState | IAuthState;

export type Reducer = ReducerWithoutAction<any> | ((state: Record<string, unknown>, action: IAction) => (Record<string, unknown>));

export type DispatchAction = ({ type, payload }: IAction) => (IAction);

export type Actions = Record<string, LogoutUserAction | SetFlashMessageAction>;

export type CreateContext = (reducer: Reducer, actions: Actions, initialState: ContextState) => {
    Context: React.Context<LocalContext>;
    Provider: ({ children }: Record<string, ReactNode>) => JSX.Element;
}