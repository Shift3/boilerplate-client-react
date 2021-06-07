import { DashboardPageContainer } from '../styled';
import { expectToMatchSnapshot } from '../../../utils/test';
import 'jest-styled-components';

describe('Dashboard Page Styled Components', () => {
  it('Should match the stored <DashboardPageContainer /> snapshot', () => expectToMatchSnapshot(<DashboardPageContainer/>));
});