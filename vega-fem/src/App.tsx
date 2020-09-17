import React from 'react';
import { presetGpnDark, Theme } from '@gpn-prototypes/vega-ui';

import { Main } from './components/Main/Main';
import { Navigation } from './components/Navigation/Navigation';

import './App.css';
/* TODO: create global main.css */
import './styles/colors.css';

export const App = (): React.ReactElement => {
  return (
    <div className="fem">
      <Theme className="App" preset={presetGpnDark}>
        <Navigation />
        <Main />
      </Theme>
    </div>
  );
};
