import packageJson from '../../package.json';
import { EnvironmentConfiguration, IEnvironment } from './types';

const apiHost = 'dj-starter-demo-staging.shift3sandbox.com';

export const environment: IEnvironment = {
  apiHost,
  apiRoute: `https://${apiHost}`,
  environment: EnvironmentConfiguration.Staging,
  isProduction: true,
  name: packageJson.name,
  version: packageJson.version,
  sentryDSN: process.env.SENTRY_DSN,
};
