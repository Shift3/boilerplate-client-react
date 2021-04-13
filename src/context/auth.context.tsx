import createDataContext from "./index.context";
import Types from "./types";
import { logoutUser } from './actions/auth.actions';
import { IAction } from '../interfaces'; 

const initialState = {
  token: null
};

const authReducer = (state: Record<string, unknown>, action: IAction) => {
  switch (action.type) {

    case Types.LOGOUT_USER:
      return { ...state, token: null };

    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext(authReducer, { logoutUser }, initialState);
