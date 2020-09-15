import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Root as VegaRoot } from '@gpn-prototypes/vega-root';
import { ProjectsPage } from '../ProjectsPage';

import {cnApp} from './cn-app'

export const App = (props) => {
  return (
    <BrowserRouter basename="projects/">
      <VegaRoot defaultTheme="dark" className={cnApp()}>
        <ProjectsPage />
      </VegaRoot>
    </BrowserRouter>
  );
}
