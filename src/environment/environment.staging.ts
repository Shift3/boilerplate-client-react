import { name, version } from '../../package.json';
import { EnvironmentConfiguration, IEnvironment } from './types';

export const environment: IEnvironment = {
  apiRoute: 'https://boilerplate-server-node-policy-test.us-west-2.elasticbeanstalk.com',
  environment: EnvironmentConfiguration.Staging,
  isProduction: process.env.NODE_ENV === 'production',
  name,
  version,
};
