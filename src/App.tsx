import React, { useState } from 'react'
import * as Sentry from '@sentry/react'

function App(): JSX.Element {
  /* TODO: As set up actual pages and routing we need determine 
  the specific behavior and props we like from Sentry ErrorBoundary(ies)
  https://docs.sentry.io/platforms/javascript/guides/react/components/errorboundary/
  */
  const [message, setMessage] = useState('Hello World!')

  const fallBackComponent = () => <div>An error has occurred.</div>
  const ErrorTestFunction = (str1: string, str2: any) => {
    const newStr = str1 + str2
    setMessage(str2)
  }

  return (
    <Sentry.ErrorBoundary fallback={fallBackComponent}>
      <h1>React Boilerplate</h1>
      <h2>
        {message} - {message.length}
      </h2>
      <button onClick={() => ErrorTestFunction('hello', undefined)} type="submit">
        Break the world
      </button>
    </Sentry.ErrorBoundary>
  )
}

export default App
