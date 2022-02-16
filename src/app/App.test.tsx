import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { createAppStore } from './redux';

test('renders app', () => {
  const { container } = render(
    <BrowserRouter>
      <Provider store={createAppStore()}>
        <App />
      </Provider>
    </BrowserRouter>,
  );

  expect(container).toBeInTheDocument();
});
