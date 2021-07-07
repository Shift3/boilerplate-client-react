import { createElement, FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface IPrivateRouteProps extends RouteProps {
  isAuth: boolean;
  authPath: string;
}

export const PrivateRoute: FC<IPrivateRouteProps> =
({ component, isAuth, ...rest }:any) => {
  const routeComponent = (props:any)   =>
    isAuth
      ? createElement(component, props)
      : <Redirect to={{ pathname: '/auth/login' }}/>;
  return <Route {...rest} render={routeComponent} />;
};