const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const dotenv = require('dotenv');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

const appConfig = require('./app-config')();
const postCssConfig = require('./postcss.config');

const gpnWebpack = require('@gpn-prototypes/frontend-configs/webpack.config')({
  appConfig,
  postCssConfig,
});

const commonWebpack = () => {
  const envConfig = dotenv.config();

  const env = envConfig.error ? {} : envConfig.parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    // eslint-disable-next-line no-param-reassign
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    plugins: [new webpack.DefinePlugin(envKeys)],
  };
};

const femFeWebpack = {
  entry: ['./src/singleSpaEntry.tsx'],
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/graphql': 'http://localhost:8080',
    },
  },
};

// module.exports = merge(commonWebpack(), gpnWebpack, femFeWebpack);

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'vega',
    projectName: 'fem',
    webpackConfigEnv,
  });

  return webpackMerge.smart(defaultConfig, commonWebpack(), {
    // modify the webpack config however you'd like to by adding to this object
    ...gpnWebpack,
    ...femFeWebpack,
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'postcss-loader',
            },
          ],
        },
      ],
    },
  });
};
