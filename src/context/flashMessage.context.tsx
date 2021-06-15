import createDataContext from './index.context';
import Types from './action.types';
import { setFlashMessage } from './actions/flashMessage.actions';
import { IFlashMessageState, ReducerType } from './types';
import { FlashMessageActionType } from './actions/types';

const { SET_FLASH_MESSAGE, CLEAR_FLASH_MESSAGE } = Types;

const actions = { setFlashMessage };

const initialState: IFlashMessageState = {
  flashMessage: null,
};

const flashMessageReducer: ReducerType = (state, action) => {
  switch (action.type) {
    case SET_FLASH_MESSAGE:
      return { ...state, flashMessage: action.payload };

    case CLEAR_FLASH_MESSAGE:
      return { ...state, flashMessage: null };

    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext<FlashMessageActionType, IFlashMessageState>(
  flashMessageReducer,
  actions,
  initialState,
);
