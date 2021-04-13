import { DispatchAction } from './context.interface';
export interface IFlashMessage {
    message: string,
    variant: string,
    timeout: number
}

export type SetFlashMessage = (dispatch: DispatchAction, payload: IFlashMessage) => () => Promise<void>;