import packageJson from '../../package.json';
import { EnvironmentConfiguration, IEnvironment } from './types';

const apiHost = 'localhost:8000';

export const environment: IEnvironment = {
  apiHost,
  apiRoute: `http://${apiHost}`,
  environment: EnvironmentConfiguration.Development,
  isProduction: process.env.NODE_ENV === 'production',
  name: packageJson.name,
  version: packageJson.version,
};
