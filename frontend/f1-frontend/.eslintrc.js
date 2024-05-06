module.exports = {
  extends: '@lnu',
  settings: {
    react: {
      version: 'detect'
    },
    'plugin:react/recommended': {}
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['import'],

  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }]
  }
}
