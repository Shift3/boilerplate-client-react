import { Dispatch } from 'react';
import Types from '../action.types';
import { LogoutUserAction, IAction, LoginuserAction, ILoginResponse } from '../../interfaces';

export const logoutUser: LogoutUserAction = (dispatch: Dispatch<IAction>) => async (payload: null) => dispatch({ type: Types.LOGOUT_USER, payload });
export const loginUser: LoginuserAction = (dispatch: Dispatch<IAction>) => async (payload: ILoginResponse) => dispatch({ type: Types.LOGIN_USER, payload });