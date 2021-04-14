import { Dispatch } from 'react';
import Types from '../action.types';
import { LogoutUserAction, LoginUserAction, IAction } from './types'
import { ILoginFormData } from '../../components/login/types';

export const logoutUser: LogoutUserAction = (dispatch: Dispatch<IAction>) => (payload: null) => dispatch({ type: Types.LOGOUT_USER, payload });
export const loginUser: LoginUserAction = (dispatch: Dispatch<IAction>) => async (payload: ILoginFormData) => {
    // eslint-disable-next-line
    console.log(payload);
    
    // make call via http service to server and receive ILoginResponse

    dispatch({ type: Types.LOGIN_USER, payload: { user: { username: "test", _id: "123456" }, token: "hfuewfue473827943$%#*@($" } });
};