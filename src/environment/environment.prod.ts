import packageJson from '../../package.json';
import { EnvironmentConfiguration, IEnvironment } from './types';

export const environment: IEnvironment = {
  apiRoute: 'https://dj-starter-demo-prod.shift3sandbox.com',
  environment: EnvironmentConfiguration.Production,
  isProduction: process.env.NODE_ENV === 'production',
  name: packageJson.name,
  version: packageJson.version,
  sentryDSN: null,
};
