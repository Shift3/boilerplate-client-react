import Types from '../types'
import { IFlashMessage } from '../../interfaces';

export const setFlashMessage = (dispatch: any, payload: IFlashMessage,) => async () => {
    dispatch({ type: Types.SET_FLASH_MESSAGE, payload });

    setTimeout(() => dispatch({ type: Types.CLEAR_FLASH_MESSAGE, payload: null }), payload.timeout);
}