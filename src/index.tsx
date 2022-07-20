import { createRoot } from 'react-dom/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBan,
  faBars,
  faBuilding,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faCog,
  faClose,
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
  faCirclePlus,
  faPen,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import * as Sentry from '@sentry/react';
import { store } from 'app/redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import { App } from './app/App';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider, withTranslation } from 'react-i18next';
import i18n from './i18n/config';
import { environment } from 'environment';

// Font Awesome recommends importing icons via a “library” in the initializing module of the app
// so you add them once in your React app and reference them in any component
// https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react
library.add(
  faBan,
  faBars,
  faBuilding,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faClose,
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
  faCirclePlus,
  faPen,
  faQuestion,
);

Sentry.init({
  environment: environment.environment,
  dsn: environment.sentryDSN ?? undefined,
  beforeSend(event) {
    if (process.env.NODE_ENV === 'production') {
      return event;
    }

    return null;
  },
  autoSessionTracking: false,
});

const TranslatedApp = withTranslation()(App);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <Suspense fallback='loading'>
          <I18nextProvider i18n={i18n}>
            <TranslatedApp />
          </I18nextProvider>
        </Suspense>
      </Provider>
    </Router>
  </StrictMode>,
);

reportWebVitals();
