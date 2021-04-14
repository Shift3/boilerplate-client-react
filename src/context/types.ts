import { LoginUserAction, LogoutUserAction, SetFlashMessageAction } from "./actions/types";

export interface IAuthState {
    token: string | null
}

export interface IFlashMessage {
    message: string,
    variant: string,
    timeout: number
}

export interface IFlashMessageState { 
    [key: string]: any
    flashMessage: IFlashMessage | null
}

export interface IAuthContext {
    loginUser: LoginUserAction
    logoutUser: LogoutUserAction
    state: IAuthState
}

export interface IFlashMessageContext {
    setFlashMessage: SetFlashMessageAction
    state: IFlashMessageState
}

// export type LocalContext = Record<string, unknown> | IAuthContext | IFlashMessageContext;