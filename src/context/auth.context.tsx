import createDataContext from "./index.context";
import Types from "./action.types";
import { logoutUser, loginUser } from './actions/auth.actions';
import { AuthActionType } from './actions/types';
import { IAuthState, ReducerType } from "./types";

const actions = { logoutUser, loginUser };

const initialState: IAuthState = {
  token: null,
  user: null
};

const authReducer: ReducerType = (state, action) => {
  switch (action.type) {
    case Types.LOGIN_USER:
      return { ...state, ...action.payload };

    case Types.LOGOUT_USER:
      return { ...state, user: null, token: null };

    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext<AuthActionType, IAuthState>(authReducer, actions, initialState);
