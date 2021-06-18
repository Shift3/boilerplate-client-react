import { name, version } from '../../package.json';
import { EnvironmentConfiguration, IEnvironment } from './types';

export const environment: IEnvironment = {
  apiRoute: 'http://localhost:3000',
  environment: EnvironmentConfiguration.Production,
  isProduction: process.env.NODE_ENV === 'production',
  name,
  version,
};
