import { createContext, useReducer } from 'react';
import { IContextProps } from '../interfaces';

const createDataContext = (reducer: any, actions: any, initialState: any) => {
  const Context = createContext<Partial<IContextProps>>({});

  const Provider = ({ children }: any) => {
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
