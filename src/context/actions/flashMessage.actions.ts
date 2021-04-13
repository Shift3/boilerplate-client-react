import Types from '../types';
import { IFlashMessage, DispatchAction, SetFlashMessage } from '../../interfaces';

export const setFlashMessage: SetFlashMessage = (dispatch: DispatchAction, payload: IFlashMessage) => async () => {
    dispatch({ type: Types.SET_FLASH_MESSAGE, payload });

    setTimeout(() => dispatch({ type: Types.CLEAR_FLASH_MESSAGE, payload: null }), payload.timeout);
}