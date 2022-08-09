import packageJson from '../../package.json';
import { EnvironmentConfiguration, IEnvironment } from './types';

export const environment: IEnvironment = {
  apiRoute: 'http://localhost:8000',
  environment: EnvironmentConfiguration.Development,
  isProduction: process.env.NODE_ENV === 'production',
  name: packageJson.name,
  version: packageJson.version,
  sentryDSN: null,
};
