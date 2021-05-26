import { Dispatch } from 'react';
import Types from '../action.types';
import { LogoutUserAction, LoginUserAction, IAction, ILoginFormPayload } from './types';

export const logoutUser: LogoutUserAction = (dispatch: Dispatch<IAction>) => (payload: null) =>
  dispatch({ type: Types.LOGOUT_USER, payload });

// eslint-disable-next-line
export const loginUser: LoginUserAction = (dispatch: Dispatch<IAction>) => async (payload: ILoginFormPayload) => {

  // @TODO make call via http service to server and receive userData and pass to
  // dispatch below (mock data being used in the mean time)
  // remove eslint-disable when payload is used

  dispatch({
    type: Types.LOGIN_USER,
    payload: { user: { username: 'fakeUser', _id: 'fakeId123456' }, token: 'fakeToken73827943' }
  });
};
