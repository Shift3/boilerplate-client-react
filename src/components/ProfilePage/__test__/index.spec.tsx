import { render } from '@testing-library/react';
import { ProfilePage } from '../';
import { expectInDocByTestId } from "utils/test";

const renderProfilePage = () => render(<ProfilePage />);

describe('<ProfilePage />', () => {
  beforeEach(() => renderProfilePage());

  it('Should render the <ProfilePageContainer />', () =>
    expectInDocByTestId('profilePageContainer'));
});