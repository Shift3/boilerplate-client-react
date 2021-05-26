import { name, version } from '../../package.json';
import { IEnvironment } from './interface';

export const environment: IEnvironment = {
  name,
  version,
  apiRoute: 'http://localhost:3000',
};
