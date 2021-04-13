import { createContext, useReducer, ReactNode } from 'react';
import { IContextProps, IAction } from '../interfaces';

export type Reducer = (state: Record<string, unknown>, action: IAction) => (Record<string, unknown>);

// eslint-disable-next-line
const createDataContext = (reducer: Reducer, actions: Record<string, any>, initialState: Record<string, unknown>) => {
  const Context = createContext<Partial<IContextProps>>({});

  const Provider = ({ children }: Record<string, ReactNode>) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions = Object.keys(actions).reduce((actionsObj, key) => (
        { ...actionsObj, [key]: actions[key](dispatch) }
      ), {});

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  
  return { Context, Provider };
};

export default createDataContext;
