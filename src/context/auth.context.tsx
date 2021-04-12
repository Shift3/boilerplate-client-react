import createDataContext from "./index.context";
import Types from "./types";
import { logoutUser } from './actions/auth.actions';

const initialState = {
  token: null
};

const authReducer = (state: any, action: any) => {
  switch (action.type) {

    case Types.LOGOUT_USER:
      return { ...state, token: null };

    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext(authReducer, { logoutUser }, initialState);
