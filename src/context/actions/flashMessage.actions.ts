import { Dispatch } from 'react';
import Types from '../action.types';
import { IFlashMessage, SetFlashMessageAction, IAction } from '../../interfaces';

export const setFlashMessage: SetFlashMessageAction = (dispatch: Dispatch<IAction>) => async (payload: IFlashMessage) => {
    dispatch({ type: Types.SET_FLASH_MESSAGE, payload });

    setTimeout(() => dispatch({ type: Types.CLEAR_FLASH_MESSAGE, payload }), payload.timeout);
}