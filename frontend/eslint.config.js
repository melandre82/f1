module.exports = {
  env: {
    browser: true, // Defines globals like `window` and `document`
    es2021: true, // Specifies the version of ECMAScript syntax
    node: true // Defines Node.js global variables and Node.js scoping
  },
  extends: [
    'airbnb', // Extends the Airbnb style guide base configurations
    'plugin:react/recommended', // Uses the recommended rules from eslint-plugin-react
    'plugin:react-hooks/recommended' // Enforces React hooks rules
  ],
  parserOptions: {
    ecmaVersion: 12, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  plugins: [
    'react', // Enables eslint-plugin-react
    'react-hooks' // Enables eslint-plugin-react-hooks
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs e.g.:
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // Allows for both js and jsx files to contain JSX code
    'react/react-in-jsx-scope': 'off', // Useful for projects using React 17+ where React import is not needed anymore
    'no-unused-vars': 'warn', // Changes the rule severity to warn
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn' // Checks effect dependencies
  }
}
