import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      '.husky/**',
      '.vscode/**',
      'coverage/**',
      'next-env.d.ts',
    ],
  },
  // 1) Load all the legacy shareable configs:
  ...compat.extends(
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),

  // 2) Project-specific overrides:
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'no-unused-vars': 'off',
      // use the TS version, error on any unused var or import:
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_', // allow _foo unused
          argsIgnorePattern: '^_',
        },
      ],
      // Next.js auto-imports React
      'react/react-in-jsx-scope': 'off',

      // Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Don’t force explicit return types everywhere
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Turn Prettier issues into ESLint errors
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
  },
];

export default eslintConfig;
