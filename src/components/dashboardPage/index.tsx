import { FC } from 'react';
import { DashboardPageContainer } from './styled';

export const DashboardPage: FC = () => {
  return (
    <DashboardPageContainer data-testid="dashboardPageContainer">
      <h2>Dashboard Page</h2>
    </DashboardPageContainer>
  );
};
