import { createContext, useReducer, ReactNode } from 'react';
import { IContextProps, Actions, CreateContext, ContextState, Reducer } from '../interfaces';

const createDataContext: CreateContext = (reducer: Reducer, actions: Actions, initialState: ContextState) => {
  const Context = createContext<Partial<IContextProps>>({});

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
