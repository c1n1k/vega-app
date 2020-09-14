import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

import './set-public-path';

import { rootComponent } from './index';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
