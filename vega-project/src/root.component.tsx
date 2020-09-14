import React from 'react';
import { ProjectsPage } from './App';
import { BrowserRouter } from "react-router-dom";
import { Root as VegaRoot } from '@gpn-prototypes/vega-root';

export default function Root(props) {
  return (
    <BrowserRouter basename="projects/">
      <VegaRoot defaultTheme="dark">
        <ProjectsPage />
      </VegaRoot>
    </BrowserRouter>
  );
}
