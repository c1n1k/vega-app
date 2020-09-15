import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppView } from './AppView';

export const App = (props) => {
  return (
    <BrowserRouter basename="projects/">
      <AppView />
    </BrowserRouter>
  );
};
