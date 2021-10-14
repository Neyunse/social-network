module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: { react: { version: 'detect' } },
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true, experimentalObjectRestSpread: true },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    semi: 0,
    curly: 'off',
    quotes: 'off',
    indent: ['error', 2],
    'no-unused-vars': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
  },
};
