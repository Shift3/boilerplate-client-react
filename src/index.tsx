// React imports
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

// Third-party package imports
import * as Sentry from '@sentry/react';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBuilding, faStethoscope, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

// App imports
import reportWebVitals from './reportWebVitals';
import { App } from './App';
import store from 'core/redux/store';

// Font Awesome recommends importing icons via a “library” in the initializing module of the app
// so you add them once in your React app and reference them in any component
// https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react
library.add(faBuilding, faStethoscope, faUser, faUsers);

/* TODO: - CMS 3/23/21
- Add in configuration for toggling autoSesssionTracking
- Discuss adding in a release option with the team
- Discuss an environment folder with the team.
*/

Sentry.init({
  dsn: 'https://943bdfd77eed4be6b91a42aa0ce6a29c@o68356.ingest.sentry.io/5622322',
  beforeSend(event) {
    if (process.env.NODE_ENV === 'production') {
      return event;
    }

    return null;
  },
  autoSessionTracking: false,
});

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
