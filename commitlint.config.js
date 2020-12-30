module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'camel-case']],
    'scope-case': [1, 'never', ['upper-case']]
  },
};

