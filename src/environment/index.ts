import * as development from './environment.dev';
import * as production from './environment.prod';
import * as staging from './environment.staging';
import { EnvironmentConfiguration, IEnvironment } from './types';

const getEnv = (): IEnvironment => {
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.REACT_APP_CONFIGURATION === EnvironmentConfiguration.Staging
  ) {
    return staging.environment;
  }

  if (process.env.NODE_ENV === 'production') {
    return production.environment;
  }

  return development.environment;
};

export const environment: IEnvironment = Object.freeze(getEnv());
