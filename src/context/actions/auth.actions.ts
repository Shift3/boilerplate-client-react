import Types from '../types'

export const logoutUser = (dispatch: any) => async () => dispatch({ type: Types.LOGOUT_USER, payload: null });