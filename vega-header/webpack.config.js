const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'vega',
    projectName: 'header',
    webpackConfigEnv,
  });

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
