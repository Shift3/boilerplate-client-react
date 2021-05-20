import { Dispatch } from 'react';
import Types from '../action.types';
import { IFlashMessage } from '../types';
import { SetFlashMessageAction, IAction } from './types';

export const setFlashMessage: SetFlashMessageAction = (dispatch: Dispatch<IAction>) => (payload: IFlashMessage) => {
  dispatch({ type: Types.SET_FLASH_MESSAGE, payload });

  setTimeout(() => dispatch({ type: Types.CLEAR_FLASH_MESSAGE, payload }), payload.timeout);
};