const prettier = require('./.prettierrc.json')

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite*.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "@typescript-eslint", 'prettier'],
  parserOptions: {
    project: "./tsconfig.json"
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': ['error', prettier],
  },
}
