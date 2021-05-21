import { IEnvironment } from './interface';
import { environment as devEnvironment } from './environment';
import { environment as prodEnvironment } from './environment.prod';

const getEnv = (): IEnvironment => (process.env.NODE_ENV === 'production' ? prodEnvironment : devEnvironment);

export const environment: IEnvironment = getEnv();
