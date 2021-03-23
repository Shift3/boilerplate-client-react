import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import reportWebVitals from './reportWebVitals'
import App from './App'

Sentry.init({
  dsn: 'https://943bdfd77eed4be6b91a42aa0ce6a29c@o68356.ingest.sentry.io/5622322',
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
