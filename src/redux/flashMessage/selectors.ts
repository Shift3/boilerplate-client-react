import { RootState } from 'redux/store';
import { FlashMessage } from './types';

export const selectFlashMessage = (state: RootState): FlashMessage => state.flashMessage.message;
