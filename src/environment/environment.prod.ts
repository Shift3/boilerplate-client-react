import packageJson from '../../package.json';
import { EnvironmentConfiguration, IEnvironment } from './types';

const apiHost = 'dj-starter-demo-prod.shift3sandbox.com';

export const environment: IEnvironment = {
  apiHost,
  apiRoute: `https://${apiHost}`,
  environment: EnvironmentConfiguration.Production,
  isProduction: process.env.NODE_ENV === 'production',
  name: packageJson.name,
  version: packageJson.version,
  sentryDSN: process.env.SENTRY_DSN,
};
