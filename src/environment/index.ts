import * as developmentEnvironmentModule from './environment.dev';
import * as productionEnvironmentModule from './environment.prod';
import * as stagingEnvironmentModule from './environment.staging';
import { EnvironmentConfiguration, IEnvironment } from './types';

let environmentModule;

if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_CONFIGURATION === EnvironmentConfiguration.Staging) {
  environmentModule = stagingEnvironmentModule;
} else if (process.env.NODE_ENV === 'production') {
  environmentModule = productionEnvironmentModule;
} else {
  environmentModule = developmentEnvironmentModule;
}

export const environment: IEnvironment = Object.freeze(environmentModule.environment);
