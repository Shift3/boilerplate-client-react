import { CenteredSpinnerContainer, DimmableContent, NoContent } from 'common/styles/utilities';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export type Props = {
  isLoading: boolean;
  isInitialLoad?: boolean;
};

export const WithLoadingOverlay: FC<PropsWithChildren<Props>> = ({ isLoading, children, isInitialLoad = false }) => {
  const [isDelayComplete, setIsDelayComplete] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setIsDelayComplete(true);
      }, 250);
    }
    if (isLoading) {
      setIsDelayComplete(false);
    }
  }, [isLoading]);

  return (
    <DimmableContent dim={!isDelayComplete}>
      {!isDelayComplete ? (
        <CenteredSpinnerContainer>
          <LoadingSpinner />
        </CenteredSpinnerContainer>
      ) : null}
      {isInitialLoad ? <NoContent /> : children}
    </DimmableContent>
  );
};
