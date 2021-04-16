import { Dispatch } from "react";
import { ILoginFormData } from "../../components/login/types";
import { IFlashMessage } from "../types";

export type DispatchAction = ({ type, payload }: IAction) => (IAction);

export interface IAction {
    type: string
    payload: IFlashMessage | ILoginResponse | null
}

// FLASH MESSAGE

export type SetFlashMessageAction = (dispatch: Dispatch<IAction>) => (payload: IFlashMessage) => Promise<void>;

// AUTH

export interface ILoginResponse {
    token: string,
    user: Record<string, unknown>
}

export type LogoutUserAction = (dispatch: Dispatch<IAction>) => (payload: null) => void;
export type LoginUserAction = (dispatch: Dispatch<IAction>) => (payload: ILoginFormData) => Promise<void>