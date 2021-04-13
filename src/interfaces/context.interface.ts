import { IFlashMessage } from "./flashMessage.interface";
export interface IAction {
    type: string
    payload: IFlashMessage |  null
}

export interface IContextProps {
    state: any
    dispatch: ({ type, payload }: IAction) => void
}

export type DispatchAction = (args: IAction) => (IAction);