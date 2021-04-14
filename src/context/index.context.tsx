import { createContext, useReducer, ReactNode } from 'react';
import { Actions, CreateContext, ContextState, Reducer, LocalContext } from '../interfaces';

const createDataContext: CreateContext = (reducer: Reducer, actions: Actions, initialState: ContextState) => {
  const Context = createContext<LocalContext>({});

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
