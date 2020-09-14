module.exports = {
  hooks: {
    ...require('@gpn-prototypes/frontend-configs/.huskyrc').hooks,
    'pre-push': 'yarn test',
  },
};
