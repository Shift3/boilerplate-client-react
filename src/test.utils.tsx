import { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider as AuthProvider } from './context/auth.context';
import { Provider as FlashMessageProvider } from './context/flashMessage.context';

const AllTheProviders: FC = ({ children }) => {
  return (
    <AuthProvider>
      <FlashMessageProvider>
        {children}
      </FlashMessageProvider>
    </AuthProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }