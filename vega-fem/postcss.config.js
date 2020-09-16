const createPostcssConfig = require('@gpn-prototypes/frontend-configs/postcss.config');
const PrefixWrap = require('postcss-prefixwrap');

module.exports = {
  // eslint-disable-next-line global-require
  ...require('@gpn-prototypes/frontend-configs/postcss.config'),
  plugins: [
    ...createPostcssConfig().plugins,
    PrefixWrap('.fem', { ignoredSelectors: [':root','.App'] }),
  ],
};
