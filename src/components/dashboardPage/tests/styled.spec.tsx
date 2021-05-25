import { DashboardPageContainer } from '../styled';
import { snapshotMatch } from '../../../utils/test';
import 'jest-styled-components';

describe('Dashboard Page Styled Components', () => {
  it('Should match the stored <DashboardPageContainer /> snapshot', () => snapshotMatch(<DashboardPageContainer/>));
});