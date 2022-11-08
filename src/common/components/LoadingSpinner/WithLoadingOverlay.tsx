import { CenteredSpinnerContainer, DimmableContent, NoContent } from 'common/styles/utilities';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import styled from 'styled-components';

const StyledLoadingSpinner = styled.div`
  padding: 3rem 0rem;
  text-align: center;
`;

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
          <StyledLoadingSpinner>
            <LoadingSpinner />
          </StyledLoadingSpinner>
        </CenteredSpinnerContainer>
      ) : null}
      {isInitialLoad ? <NoContent title='' /> : children}
    </DimmableContent>
  );
};
