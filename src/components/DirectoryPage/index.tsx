import { FC } from 'react';
import { DirectoryPageContainer } from './styled';

export const DirectoryPage: FC = () => {
  return (
    <DirectoryPageContainer data-testid='directoryPageContainer'>
      <h2>Directory Page</h2>
    </DirectoryPageContainer>
  );
};