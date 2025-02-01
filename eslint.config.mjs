import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    root: true,
    extends: [
      'next/core-web-vitals',
      'plugin:tailwindcss/recommended',
      'prettier',
    ],
    plugins: ['@typescript-eslint', 'tailwindcss'],
    rules: {
      'tailwindcss/classnames-order': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'warn',
        { allowNumber: true },
      ],
      '@typescript-eslint/array-type': 'off',
    },
    parser: '@typescript-eslint/parser',
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        parserOptions: {
          project: ['./tsconfig.json'],
          projectService: true,
          tsconfigRootDir: __dirname,
        },
        extends: [
          'next/core-web-vitals',
          'plugin:@typescript-eslint/recommended',
          'plugin:@typescript-eslint/recommended-type-checked',
          'plugin:@typescript-eslint/strict-type-checked',
          'plugin:@typescript-eslint/stylistic-type-checked',
          'plugin:tailwindcss/recommended',
          'prettier',
        ],
        rules: {
          'tailwindcss/classnames-order': 'off',
          '@typescript-eslint/consistent-type-definitions': 'off',
          '@typescript-eslint/restrict-template-expressions': [
            'warn',
            { allowNumber: true },
          ],
          '@typescript-eslint/array-type': 'off',
        },
      },
    ],
  }),
  {
    ignores: [
      'node_modules',
      '.next',
      '.husky',
      'coverage',
      '.prettierignore',
      '.stylelintignore',
      '.eslintignore',
      'stories',
      'storybook-static',
      '*.log',
      'playwright-report',
      '.nyc_output',
      'test-results',
      'junit.xml',
      'docs',
      'README.md',
    ],
  },
];

export default eslintConfig;
