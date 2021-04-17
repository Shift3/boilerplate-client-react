import { createContext, useReducer, ReactNode, ReducerWithoutAction } from 'react';
import { IAction, LogoutUserAction, LoginUserAction, SetFlashMessageAction } from './actions/types';
import { IFlashMessageState, IAuthState } from './types';

// eslint-disable-next-line
export type Reducer = ReducerWithoutAction<any> | ((state: Record<string, unknown>, action: IAction) => (Record<string, unknown>));

export type ContextState = Record<string, unknown> | IFlashMessageState | IAuthState;


export type CreateContext = (reducer: Reducer, actions: Actions, initialState: ContextState) => {
  // eslint-disable-next-line
  Context: React.Context<Record<string, any>>;
  Provider: ({ children }: Record<string, ReactNode>) => JSX.Element;
}

export type Actions = Record<string, LogoutUserAction | LoginUserAction | SetFlashMessageAction>;


const createDataContext: CreateContext = (reducer: Reducer, actions: Actions, initialState: ContextState) => {
  // eslint-disable-next-line
  const Context = createContext<Record<string, any>>({});

  const Provider = ({ children }: Record<string, ReactNode>) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions: { [x: string]: unknown } = Object.keys(actions).reduce((actionsObj: Record<string, unknown>, key: string) => (
        { ...actionsObj, [key]: actions[key](dispatch) }
      ), {});

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        { children }
      </Context.Provider>
    );
  };
  
  return { Context, Provider };
};

export default createDataContext;
