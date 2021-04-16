import createDataContext from "./index.context";
import Types from "./action.types";
import { setFlashMessage } from './actions/flashMessage.actions';
import { IAction } from "./actions/types";
import { IFlashMessageState } from "./types";

const initialState: IFlashMessageState = {
  flashMessage: {
      message: 'test',
      variant: 'success',
      timeout: 5000
  }
};

const flashMessageReducer = (state: Record<string, unknown>, action: IAction) => {
  switch (action.type) {

    case Types.SET_FLASH_MESSAGE:
        return { ...state, flashMessage: action.payload }

    case Types.CLEAR_FLASH_MESSAGE:
      return { ...state, flashMessage: null };

    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext(flashMessageReducer, { setFlashMessage }, initialState);