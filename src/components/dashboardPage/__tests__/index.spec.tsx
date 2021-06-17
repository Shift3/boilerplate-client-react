import { render } from '@testing-library/react';
import { DashboardPage } from '..';
import { expectInDocByTestId } from '../../../utils/test';

describe('<DashboardPage/>', () => {
  render(<DashboardPage />);

  it('Should render the <DashboardPageContainer/>', () => expectInDocByTestId('dashboardPageContainer'));
});
