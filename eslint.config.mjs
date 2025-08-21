import globals from 'globals';
import path from 'node:path';
import url from 'node:url';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['./dist/', '**/dist/', '**/node_modules/'],
  },
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ),
  {
    plugins: {
      '@typescript-eslint': tsPlugin,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',

      parserOptions: {
        project: 'tsconfig.json',
      },
    },

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

      'max-len': [
        'error',
        {
          code: 200,
          ignorePattern: '^import |^export ',
        },
      ],

      'max-statements': ['error', 10],
    },
  },
  {
    files: ['packages/*/src/**/*.ts'],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['./packages/poap-sdk/tsconfig.json', './tsconfig.json'],
      },
    },
  },
  {
    files: ['**/*.spec.ts'],

    rules: {
      'max-lines-per-function': 'off',
      'max-statements': 'off',
    },
  },
];
