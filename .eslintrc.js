module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true
  },
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['prettier'],
  rules: {
    'jsx-a11y/click-events-have-key-events': 1,
    'jsx-a11y/no-static-element-interactions': 1,
    'no-debugger': 1,
    'no-unused-vars': 1,
    'no-unused-expressions': 1,
    'react/destructuring-assignment': 1,
    'react/prop-types': 1,
    'react/require-default-props': 1,
    'react/prefer-stateless-function': 1,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none'
      }
    ],
    'react/jsx-one-expression-per-line': false
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
};
