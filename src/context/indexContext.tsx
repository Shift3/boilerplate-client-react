/* eslint-disable object-curly-newline */
/* eslint-disable guard-for-in */
import React, { createContext, useReducer } from 'react'

export interface IContextProps {
  state: any
  dispatch: ({ type }: { type: string }) => void
}

const createDataContext = (reducer: any, actions: any, initialState: any) => {
  const Context = createContext<Partial<IContextProps>>({})

  const Provider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const boundActions: any = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch)
    }

    return (
      <Context.Provider
        value={{
          state,
          ...boundActions,
        }}
      >
        {children}
      </Context.Provider>
    )
  }
  return {
    Context,
    Provider,
  }
}

export default createDataContext
