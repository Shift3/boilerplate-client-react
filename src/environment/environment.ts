import { name, version } from '../../package.json';

export interface IEnvironment {
  apiRoute: string;
  environment: string;
  isProduction: boolean;
  name: string;
  version: string;
}

export const environment: IEnvironment = {
  apiRoute: process.env.REACT_APP_API_ROUTE ?? '',
  environment: process.env.REACT_APP_ENV ?? '',
  isProduction: process.env.NODE_ENV === 'production',
  name,
  version,
};
