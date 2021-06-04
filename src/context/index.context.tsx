import { createContext, useReducer, ReactNode } from 'react';
import { ProviderType, ReducerType, CreateDataContextType } from './types';


const createDataContext: CreateDataContextType = <ActionType extends CallableFunction, StateType> (
  reducer: ReducerType,
  actions: Record<string, ActionType>,
  initialState: StateType
) => {
  const Context = createContext({});

  const Provider: ProviderType = ({ children }: Record<string, ReactNode>) => {
    const [ state, dispatch ] = useReducer(reducer, initialState);

    const boundActions: Record<string, ActionType> = Object.keys(actions)
      .reduce((actionsObj: Record<string, ActionType>, key: string) => (
        { ...actionsObj, [ key ]: actions[ key ](dispatch) }
      ), {});

    return (
      <Context.Provider
        value={{ state, ...boundActions }}
      >
        { children }
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

export default createDataContext;
