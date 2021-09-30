import { FC } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export type Props = {
  isLoading: boolean;
};

export const WithLoadingOverlay: FC<Props> = ({ isLoading, children }) =>
  isLoading ? <LoadingSpinner /> : <>{children}</>;
