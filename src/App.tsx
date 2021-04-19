import { FC } from 'react'
import { ErrorBoundary } from '@sentry/react'
import { HolyGrailLayout } from './components/holyGrailLayout/index'

// Context
import { Provider as AuthProvider } from './context/auth.context'
import { Provider as FlashMessageProvider } from './context/flashMessage.context'
import { FlashMessage } from './components/flashMessage/FlashMessage'

export const App: FC = () => (
  <ErrorBoundary>
    <AuthProvider>
      <FlashMessageProvider>
        <FlashMessage />
        <HolyGrailLayout leftSidebar={<NavBar />} mainContent={<MainContent />} footer={<Footer />} />
      </FlashMessageProvider>
    </AuthProvider>
  </ErrorBoundary>
)
