import { ReducerWithoutAction, ReactNode } from 'react';
import { LoginUserAction, LogoutUserAction, IAction } from './actions/types';

export interface IAuthState {
  token: string | null;
  user: Record<string, unknown> | null;
}

export interface IAuthContext {
  loginUser: LoginUserAction;
  logoutUser: LogoutUserAction;
  state: IAuthState;
}

export type ProviderType = ({ children }: Record<string, ReactNode>) => JSX.Element;

export type ReducerType =
  | ReducerWithoutAction<any>
  | ((state: Record<string, unknown>, action: IAction) => Record<string, unknown>);

export type CreateDataContextType = <ActionType extends Function, StateType>(
  reducer: ReducerType,
  actions: Record<string, ActionType>,
  initialState: StateType,
) => {
  Context: React.Context<Record<string, any>>;
  Provider: ProviderType;
};
