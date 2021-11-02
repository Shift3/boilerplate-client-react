import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createAppStore } from 'app/redux';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'utils/styleValues';
import { Footer } from './index';

describe('<Footer/>', () => {
  it('should render', () => {
    render(
      <Provider store={createAppStore()}>
        <ThemeProvider theme={AppTheme}>
          <Footer />
        </ThemeProvider>
      </Provider>,
    );
  });
});
