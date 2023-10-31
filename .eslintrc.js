module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: ['plugin:react/recommended', 'standard'],
  overrides: [
    {
      files: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)'
      ],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react'
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['react', 'jest', 'jest-dom', 'testing-library'],
  rules: {
    'no-extra-semi': 0,
    semi: 0,
    'react/react-in-jsx-scope': off,
    'import/prefer-default-export': off,
    'import/no-default-export': error
  }
};
