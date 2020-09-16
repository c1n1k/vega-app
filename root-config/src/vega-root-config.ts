import { registerApplication, start } from 'single-spa';
import { constructApplications, constructLayoutEngine, constructRoutes } from 'single-spa-layout';

const fetch = () => console.log('fetch');

const layoutData = {
  props: {
    authToken: '78sf9d0fds89-0fysdiuf6sf8',
    fetch,
  },
  loaders: {},
};

const routes = constructRoutes(
  document.querySelector('#single-spa-layout') as HTMLTemplateElement,
  layoutData,
);

const applications = constructApplications({
  routes,
  loadApp: ({ name }) => System.import(name),
});

const layoutEngine = constructLayoutEngine({ routes, applications });


applications.forEach(registerApplication);
layoutEngine.activate();
start();
