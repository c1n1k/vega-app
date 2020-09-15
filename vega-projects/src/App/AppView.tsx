import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Loader, Root as VegaRoot } from '@gpn-prototypes/vega-ui';

import './App.css';
import { PageLayout } from '../layouts/PageLayout';
import { ProjectsPage } from '../pages/projects';
import { CreateProjectPage } from '../pages/create-project';
import { cnApp } from './cn-app';

const testId = {
  loader: 'App:loader',
};

export const AppView = (): React.ReactElement => {
  const content = (
    <Switch>
      <Route exact path="/">
        <PageLayout>
          <ProjectsPage />
        </PageLayout>
      </Route>
      <Route exact path="/create">
        <PageLayout>
          <CreateProjectPage />
        </PageLayout>
      </Route>
      {/* <Route exact path="/">
        <PageLayout>**** insert your code here ****</PageLayout>
      </Route> */}
      <Route path="*">
        <PageLayout>
          <div>404</div>
        </PageLayout>
      </Route>
    </Switch>
  );

  return (
    <VegaRoot defaultTheme="dark" className={cnApp()}>
      {content}
    </VegaRoot>
  );
};
