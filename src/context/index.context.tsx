import { createContext, useReducer, ReactNode } from 'react';
import { ProviderType, ReducerType, CreateDataContextType } from './types';

const createDataContext: CreateDataContextType = <ActionType extends Function, StateType> (
  reducer: ReducerType,
  actions: Record<string, ActionType>,
  initialState: StateType
) => {
  const Context = createContext({});

  const Provider: ProviderType = ({ children }: Record<string, ReactNode>) => {
    const [ state, dispatch ] = useReducer(reducer, initialState);

<<<<<<< HEAD
export type Actions = Record<string, LogoutUserAction | LoginUserAction | SetFlashMessageAction>;

export type CreateContext = (reducer: Reducer, actions: Actions, initialState: ContextState) => {
  // eslint-disable-next-line
  Context: React.Context<Record<string, any>>;
  Provider: ({ children }: Record<string, ReactNode>) => JSX.Element;
}

const createDataContext: CreateContext = (reducer: Reducer, actions: Actions, initialState: ContextState) => {
  // eslint-disable-next-line
  const Context = createContext<Record<string, any>>({});

  const Provider = ({ children }: Record<string, ReactNode>) => {
    const [ state, dispatch ] = useReducer(reducer, initialState);

    const boundActions: { [ x: string ]: unknown } = Object.keys(actions)
      .reduce((actionsObj: Record<string, unknown>, key: string) => (
=======
    const boundActions: Record<string, ActionType> = Object.keys(actions)
      .reduce((actionsObj: Record<string, ActionType>, key: string) => (
>>>>>>> c155670... refactor(context): refactored createDataContext to utilize generics passed in upon method execution
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
