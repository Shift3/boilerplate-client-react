import createDataContext from "./index.context";
import Types from "./action.types";
import { logoutUser } from './actions/auth.actions';
import { IAction } from '../interfaces'; 

const initialState = {
  token: null,
  user: null
};

const authReducer = (state: Record<string, unknown>, action: IAction) => {
  switch (action.type) {

    case Types.LOGIN_USER:
      return { ...state, ...action.payload }

    case Types.LOGOUT_USER:
      return { ...state, token: null };

    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext(authReducer, { logoutUser }, initialState);
