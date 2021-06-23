import { render } from '@testing-library/react';
import { DirectoryPage } from '../';
import { expectInDocByTestId } from "utils/test";

const renderDirectoryPage = () => render(<DirectoryPage />);

describe('<DirectoryPage />', () => {
  beforeEach(() => renderDirectoryPage());

  it('Should render the <DirectoryPageContainer />', () =>
    expectInDocByTestId('directoryPageContainer'));
});