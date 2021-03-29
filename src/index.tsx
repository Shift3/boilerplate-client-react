import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import reportWebVitals from './reportWebVitals'
import App from './App'

/* TODO: - CMS 3/23/21
- Add in configuration for toggling autoSesssionTracking
- Discuss adding in a release option with the team
- Discuss an environment folder with the team. 
*/
Sentry.init({
  dsn: 'https://943bdfd77eed4be6b91a42aa0ce6a29c@o68356.ingest.sentry.io/5622322',
  beforeSend(event) {
    if (process.env.NODE_ENV === 'production') {
      return event
    }

    return null
  },
  autoSessionTracking: false,
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
