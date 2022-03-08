import { CenteredSpinnerContainer, DimmableContent } from 'common/styles/utilities';
import { FC, useEffect, useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export type Props = {
  isLoading: boolean;
  containerHasRoundedCorners: boolean;
  containerBorderRadius: string;
};

export const WithLoadingOverlay: FC<Props> = ({ isLoading, containerHasRoundedCorners, containerBorderRadius, children }) => {

  const [isDelayComplete, setIsDelayComplete] = useState(false);

  useEffect(
    () => {
      if (!isLoading) {
        setTimeout(() => {
          setIsDelayComplete(true);
        }, 
        250);
      } else {
        setIsDelayComplete(false);
      }
    },
    [isLoading],
  );

  return (
    <DimmableContent dim={!isDelayComplete} containerHasRoundedCorners={containerHasRoundedCorners} containerBorderRadius={containerBorderRadius}>
      { !isDelayComplete ? 
        <CenteredSpinnerContainer>
          <LoadingSpinner />
        </CenteredSpinnerContainer> :
        null
      }
      {children}
    </DimmableContent>
  );
}

