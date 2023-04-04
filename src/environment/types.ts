export enum EnvironmentConfiguration {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

export interface IEnvironment {
  apiHost: string;
  apiRoute: string;
  environment: EnvironmentConfiguration;
  isProduction: boolean;
  name: string;
  version: string;
  sentryDSN?: string;
}
