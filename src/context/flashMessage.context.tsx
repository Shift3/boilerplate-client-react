import createDataContext from './index.context';
import Types from './action.types';
import { setFlashMessage } from './actions/flashMessage.actions';
import { IAction } from './actions/types';
import { IFlashMessageState } from './types';

const { SET_FLASH_MESSAGE, CLEAR_FLASH_MESSAGE } = Types;

const initialState: IFlashMessageState = {
  flashMessage: null
};

const flashMessageReducer = (state: Record<string, unknown>, action: IAction) => {
  switch (action.type) {
    case SET_FLASH_MESSAGE:
      return { ...state, flashMessage: action.payload };

    case CLEAR_FLASH_MESSAGE:
      return { ...state, flashMessage: null };

    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext(flashMessageReducer, { setFlashMessage }, initialState);
