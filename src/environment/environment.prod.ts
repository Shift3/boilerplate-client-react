import packageJson from '../../package.json';
import { EnvironmentConfiguration, IEnvironment } from './types';

// const apiHost = 'dj-starter-demo-prod.shift3sandbox.com';

// Important - Use these while testing
const apiHost = 'localhost';
const devApiRoute = `http://${apiHost}:8000`;

export const environment: IEnvironment = {
  apiHost,
  // apiRoute: `http://${apiHost}`,
  apiRoute: devApiRoute,
  environment: EnvironmentConfiguration.Production,
  isProduction: true,
  name: packageJson.name,
  version: packageJson.version,
  sentryDSN: process.env.SENTRY_DSN,
};
