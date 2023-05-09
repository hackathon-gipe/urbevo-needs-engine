module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'prettier'],
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  rules: {
    'no-return-await': ['error'],
    'prettier/prettier': ['error'],
    'object-curly-spacing': ['error', 'always'],
    'no-console': 'off',
    'comma-dangle': ['error', 'never'],
    'no-useless-escape': 'off',
    'no-async-promise-executor': 'off', // this rule can be deleted upgrading to dynamo sdk 3.0
    'max-len': 'off',
    indent: 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions', 'constructors'] }],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
          Object: false,
          object: false
        },
        extendDefaults: true
      }
    ]
  }
};