import { CenteredSpinnerContainer } from 'common/styles/utilities';
import { FC } from 'react';
import { LoadingSpinner } from '.';

export const DisablerLoadingOverlay: FC = () => {

  return (
    <div className='h-100 w-100'>
      <CenteredSpinnerContainer>
        <LoadingSpinner />
      </CenteredSpinnerContainer>
    </div>
  )
};