module.exports = {
  root: true,
  extends: '@react-native-community',
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        camelcase: [2, {properties: 'always'}],
        'no-console': 'error',
        'sort-imports': [
          'error',
          {
            ignoreCase: true,
            ignoreMemberSort: false,
            ignoreDeclarationSort: true,
          },
        ],
      },
    },
  ],
};