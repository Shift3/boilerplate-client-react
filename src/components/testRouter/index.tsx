import { FC } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

export const TestRouter: FC = ({ children }) => (
  <Router>
    <Switch>
      { children }
    </Switch>
  </Router>
);