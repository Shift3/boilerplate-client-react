import { Footer, copyrightDate } from '../index';
import { Constants } from 'utils/constants';
import { Provider } from 'react-redux';
import { createAppStore } from 'app/redux';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';
import { expectTextContentByTestId } from 'utils/test';

const { version, creationYear } = Constants;

const expectedCopyrightDate = `${creationYear}` || `${creationYear} - ${new Date().getFullYear()}`;

describe('footer', () => {
  beforeEach(() => {
    <Provider store={createAppStore()}>
      <ThemeProvider theme={AppTheme}>
        <Footer />
      </ThemeProvider>
    </Provider>;
  });

  it.skip('Should contain the version', () => expectTextContentByTestId('copyright', version));

  it.skip('Should contain the copyright date', () => expectTextContentByTestId('copyright', copyrightDate));

  it.skip('Should display properly formatted copyright date', () =>
    expect(copyrightDate).toEqual(expectedCopyrightDate));
});
