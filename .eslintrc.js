module.exports = {
  extends: ['eslint:recommended', 'google'],
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018
    // sourceType: 'module',
  },
  rules: {
    'block-scoped-var': 'error',
    'brace-style': ['error', '1tbs'],
    'dot-location': ['error', 'property'],
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-labels': 'error',
    'no-sparse-arrays': 'error',
    'no-use-before-define': ['error', { functions: false, classes: false }],
    'no-whitespace-before-property': 'error',
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': ['error'],
    'space-unary-ops': ['error'],
    'max-len': 'off',
    'new-cap': 'off',
    'no-console': 'off',
    'require-jsdoc': 'off',
    camelCase: { ignoreDestructuring: true },
    ignoreDestructuring: true
  },
  plugins: ['eslint-plugin-html']
};
