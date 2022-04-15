import { name, version } from '../../package.json';
import { EnvironmentConfiguration, IEnvironment } from './types';

export const environment: IEnvironment = {
  apiRoute: 'https://bp-server-production.shift3sandbox.com',
  environment: EnvironmentConfiguration.Production,
  isProduction: process.env.NODE_ENV === 'production',
  name,
  version,
};
