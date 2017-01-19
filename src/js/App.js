import React from 'react';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { getRoutes } from './routes';
import configureStore from './store';

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
const history = syncHistoryWithStore(browserHistory, store);

export default () => (
  <Provider store={store}>
    <Router routes={getRoutes(store)} history={history}
      onUpdate={() => document.getElementById('content').focus()} />
  </Provider>
);
