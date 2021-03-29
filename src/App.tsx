import React, { useState } from 'react'
import * as Sentry from '@sentry/react'

function App(): JSX.Element {
  /* TODO: Delete message and setMessage useState hook, fallbackComponent, 
  ExampleLandingPage once we actually set the app with actual pages 
  and routing. These are just for testing Sentry's ErrorBoundary component
  fallback behavior.  
  */
  const [message, setMessage] = useState<string>('Hello World!')
  const fallbackComponent = (): JSX.Element => (
    <div>
      <h1>Sorry, an error has occurred. Please refresh the page.</h1>
    </div>
  )
  const ExampleLandingPage = (): JSX.Element => {
    const ErrorTestFunction = (str1: string, str2: string | undefined) => {
      const newStr = str1 + str2
      setMessage(newStr)
    }
    return (
      <div>
        <h1>React Boilerplate</h1>
        <h2>
          {message} - {message.length}
        </h2>
        <button onClick={() => ErrorTestFunction('hello', undefined)} type="submit">
          Break the world
        </button>
      </div>
    )
  }
  /* TODO: As set up actual pages and routing we need determine 
  the specific behavior and props we like from Sentry ErrorBoundary(ies)
  https://docs.sentry.io/platforms/javascript/guides/react/components/errorboundary/
  */
  return (
    <Sentry.ErrorBoundary fallback={fallbackComponent} showDialog>
      <ExampleLandingPage />
    </Sentry.ErrorBoundary>
  )
}

export default App
