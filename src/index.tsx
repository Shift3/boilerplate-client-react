import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBan,
  faBuilding,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faCog,
  faEdit,
  faEllipsisH,
  faEnvelope,
  faEye,
  faEyeSlash,
  faFilter,
  faLock,
  faSignOutAlt,
  faSort,
  faSortDown,
  faSortUp,
  faStethoscope,
  faTrashAlt,
  faUser,
  faUsers,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import * as Sentry from '@sentry/react';
import { store } from 'app/redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import { App } from './app/App';
import i18n from './i18n/config';
import reportWebVitals from './reportWebVitals';

library.add(
  faBan,
  faBuilding,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faCog,
  faEdit,
  faEllipsisH,
  faEnvelope,
  faEye,
  faEyeSlash,
  faFilter,
  faLock,
  faSignOutAlt,
  faSort,
  faSortDown,
  faSortUp,
  faStethoscope,
  faTrashAlt,
  faUser,
  faUsers,
  faX,
);

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
    <Router>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    </Router>
  </StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
