export interface IAuthState {
    token: string | null
}
  
export interface IAuthAction {
    type: string
    payload: any
}