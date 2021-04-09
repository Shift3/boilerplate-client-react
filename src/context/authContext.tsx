import createDataContext from './indexContext'
import { Types } from './types'

interface IAuthState {
  token: string | null
}

interface IAction {
  type: string
  payload: any
}

const initialState: IAuthState = {
  token: null,
}

const authReducer = (state: IAuthState, action: IAction) => {
  switch (action.type) {
    case Types.LOGOUT_USER:
      return {
        token: 'abc',
      }

    default:
      return state
  }
}

const logoutUser = (dispatch: any) =>
  dispatch({
    type: Types.LOGOUT_USER,
    payload: null,
  })

export const { Context: IContextProps, Provider } = createDataContext(
  authReducer,
  {
    logoutUser,
  },
  initialState,
)
