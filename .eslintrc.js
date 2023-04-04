module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', './cdk.out', './dist'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': ['error'],
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/prefer-as-const': ['error'],
    '@typescript-eslint/restrict-plus-operands': ['error'],
    '@typescript-eslint/await-thenable': ['error'],
    '@typescript-eslint/no-floating-promises': ['error'],
    '@typescript-eslint/no-misused-promises': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    complexity: ['error', 5],
    'max-len': ['error', { code: 100, ignorePattern: '^import |^export ' }],
    'max-statements': ['error', 10],
  },
  overrides: [
    {
      files: ['packages/*/src/**/*.ts', 'index.ts'],
      parserOptions: {
        project: [
          './packages/moments/tsconfig.json',
          './packages/drops/tsconfig.json',
          './packages/providers/tsconfig.json',
          './packages/attributes/tsconfig.json',
          './packages/types/tsconfig.json',
          './tsconfig.json',
        ],
      },
    },
    {
      files: ['*.spec.ts'],
      rules: {
        'max-lines-per-function': 'off',
        'max-statements': 'off',
      },
    },
  ],
};