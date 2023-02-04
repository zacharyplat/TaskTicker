module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': 'off',
    semi: 'off',
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '(^_|\\bprops\\b)',
        caughtErrors: 'none',
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'no-param-reassign': ['error', { props: true }],
  },
  overrides: [
    // Copied from https://github.com/facebook/react-native/blob/67309277fe588c4dd64fe0c680d1d00d2f3fb2b6/packages/eslint-config-react-native-community/index.js#L64-L76
    // so that we can update the `files` property to include `js/test`.
    {
      files: [
        'js/test/**/*.{js,ts,tsx}',
        '*.{spec,test}.{js,ts,tsx}',
        '**/__{mocks,tests}__/**/*.{js,ts,tsx}',
      ],
      env: {
        jest: true,
        'jest/globals': true,
      },
      rules: {
        'react-native/no-inline-styles': 0,
      },
    },
  ],
  ignorePatterns: ['js/src/graphql/generated'],
};
