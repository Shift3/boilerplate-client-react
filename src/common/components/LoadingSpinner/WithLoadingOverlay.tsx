import { CenteredSpinnerContainer, DimmableContent, DimType, NoContent } from 'common/styles/utilities';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import styled from 'styled-components';

const StyledLoadingSpinner = styled.div<{
  length: number;
}>`
  padding: 3rem 0rem;
  text-align: center;

  #loading-spinner {
    width: ${props => `${props.length}em`};
    height: ${props => `${props.length}em`};
  }
`;

export type Props = {
  isLoading: boolean;
  length?: number;
  isInitialLoad?: boolean;
  containerHasRoundedCorners: boolean;
  containerBorderRadius: string;
};

export const WithLoadingOverlay: FC<PropsWithChildren<Props>> = ({
  isLoading,
  length = 4,
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
      type={DimType.LIGHT}
      containerHasRoundedCorners={containerHasRoundedCorners}
      containerBorderRadius={containerBorderRadius}
    >
      {!isDelayComplete ? (
        <CenteredSpinnerContainer>
          <StyledLoadingSpinner length={length}>
            <LoadingSpinner />
          </StyledLoadingSpinner>
        </CenteredSpinnerContainer>
      ) : null}
      {isInitialLoad ? <NoContent /> : children}
    </DimmableContent>
  );
};
