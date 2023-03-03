import * as development from './environment.dev';
import * as production from './environment.prod';
import * as staging from './environment.staging';
import { IEnvironment } from './types';

const getEnv = (): IEnvironment => {
  return (
    {
      production: production.environment,
      staging: staging.environment,
    }[import.meta.env.MODE] || development.environment
  );
};

export const environment: IEnvironment = Object.freeze(getEnv());
