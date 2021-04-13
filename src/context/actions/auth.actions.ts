import Types from '../types';
import { DispatchAction, LogoutUser } from '../../interfaces';

export const logoutUser: LogoutUser = async (dispatch: DispatchAction) => dispatch({ type: Types.LOGOUT_USER, payload: null });