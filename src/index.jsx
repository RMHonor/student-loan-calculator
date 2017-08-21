import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';

import reducers from './reducers';

import Form from './components/details-form/details-form';

import './index.scss';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(promise),
));

ReactDOM.render(
  <Provider store={store}>
    <Form />
  </Provider>,
  document.querySelector('#root'),
);
