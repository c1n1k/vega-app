const webpackMerge = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const isProduction = mode === 'production';
// const styleLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'vega',
    projectName: 'auth',
    webpackConfigEnv,
  });

  console.log(webpackConfigEnv);

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: 'postcss-loader',
              // eslint-disable-next-line global-require
              // options: { ...postCssConfig },
            },
          ],
        },
      ],
    },
  });
};
