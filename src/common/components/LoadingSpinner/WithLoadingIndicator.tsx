import { FC } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export type Props = {
  isLoading: boolean;
};

export const WithLoadingIndicator: FC<Props> = ({ isLoading, children }) =>
  isLoading ? <LoadingSpinner /> : <>{children}</>;
