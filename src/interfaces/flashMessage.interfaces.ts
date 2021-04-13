import { Dispatch } from 'react';
import { IAction } from './context.interfaces';
export interface IFlashMessage {
    message: string,
    variant: string,
    timeout: number
}

export interface IFlashMessageState { 
    [key: string]: any
    flashMessage: IFlashMessage | null
}

export type SetFlashMessageAction = (dispatch: Dispatch<IAction>) => (payload: IFlashMessage) => Promise<void>;