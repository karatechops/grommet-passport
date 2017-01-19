import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Login from './containers/Login/LoginPage';
import App from './containers/App';
import NotFound from './containers/NotFoundPage';

export const getRoutes = (store) => {
  /*const authRequired = (nextState, replace) => {
    const state = store.getState();

    if (!state.login.loggedIn) {
      // Not authenticated, redirect to login page.
      replace({
        state: {
          nextPathname: nextState.location.pathname
        },
        pathname: '/dashboard'
      });
    }
  };*/

  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};
