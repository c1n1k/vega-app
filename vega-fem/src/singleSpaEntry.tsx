import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

import './set-public-path';

import { rootComponent } from './index';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent,
  suppressComponentDidCatchWarning: true,
});

export const { bootstrap, mount, unmount } = lifecycles;
