import createDataContext from "./index.context";
import Types from "./action.types";
import { logoutUser, loginUser } from './actions/auth.actions';
import { IAction } from './actions/types';

const { LOGIN_USER, LOGOUT_USER } = Types;

const initialState = {
  token: null,
  user: null
};

const authReducer = (state: Record<string, unknown>, action: IAction) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, ...action.payload };

    case LOGOUT_USER:
      return { ...state, user: null, token: null };

    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext(authReducer, { logoutUser, loginUser }, initialState);