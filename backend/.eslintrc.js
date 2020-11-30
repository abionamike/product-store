module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 'off',
    'linebreak-style': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'no-undef': 'off',
    'import/no-unresolved': 'off',
  },
};
