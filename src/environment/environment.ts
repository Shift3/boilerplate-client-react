import { name, version } from '../../package.json';

export interface IEnvironment {
  name: string;
  version: string;
  apiRoute: string;
}

export const environment: IEnvironment = {
  name,
  version,
  apiRoute: process.env.REACT_APP_API_ROUTE ?? '',
};
