import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store/store';
import { App } from './App';

import './App.css';

export const rootComponent = () => (
  <Provider store={store}>
    <BrowserRouter basename="projects/">
      <App />
    </BrowserRouter>
  </Provider>
);
