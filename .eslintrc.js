module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: ['plugin:react/recommended', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['react'],
  rules: {
    'no-extra-semi': 0,
    semi: 0
  }
};
