module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 'off',
    'linebreak-style': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': 'off',
    'no-use-before-define': 'off',
    'jsx-filename-extension': 'off',
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
    'max-len': 'off',
    radix: 'off',
  },
};
