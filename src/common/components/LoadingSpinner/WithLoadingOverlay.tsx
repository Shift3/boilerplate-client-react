import { CenteredSpinnerContainer, DimmableContent, NoContent } from 'common/styles/utilities';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import styled from 'styled-components';

const StyledLoadingSpinner = styled.div`
  padding: 3rem 0rem;
  text-align: center;
  
  #loading-spinner {
    width: 4em;
    height: 4em;
  }
`;

export type Props = {
  isLoading: boolean;
  isInitialLoad?: boolean;
  containerHasRoundedCorners: boolean;
  containerBorderRadius: string;
};

export const WithLoadingOverlay: FC<PropsWithChildren<Props>> = ({
  isLoading,
  containerHasRoundedCorners,
  containerBorderRadius,
  children,
  isInitialLoad = false,
}) => {
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
    <DimmableContent
      dim={!isDelayComplete}
      containerHasRoundedCorners={containerHasRoundedCorners}
      containerBorderRadius={containerBorderRadius}
    >
      {!isDelayComplete ? (
        <CenteredSpinnerContainer>
          <StyledLoadingSpinner>
            <LoadingSpinner />
          </StyledLoadingSpinner>
        </CenteredSpinnerContainer>
      ) : null}
      {isInitialLoad ? <NoContent /> : children}
    </DimmableContent>
  );
};
