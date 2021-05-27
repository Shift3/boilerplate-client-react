import { render, screen, cleanup } from '@testing-library/react';
import { DashboardPage } from '../';

const { getByTestId } = screen;

beforeEach(() => render(<DashboardPage />));

afterEach(cleanup);

describe('<DashboardPage/>', () => {
  it('Should render the <DashboardPageContainer/>', () => {
    expect(getByTestId("dp-c")).toBeInTheDocument();
  });
})