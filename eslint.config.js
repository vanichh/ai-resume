import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import cssModules from 'eslint-plugin-css-modules';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      'css-modules': cssModules,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
          custom: {
            regex: '(Type|Props)$',
            match: true,
          },
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      curly: ['error', 'all'],
      'css-modules/no-unused-class': 'error',
      eqeqeq: ['error', 'always'],
      'import/no-duplicates': 'error',
      'jsx-quotes': ['error', 'prefer-single'],
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@components/*/*.tsx', '@components/*/*/*.tsx', '@components/*/*/*/*.tsx'],
              message: 'Импортируй компоненты через index.ts.',
            },
          ],
        },
      ],
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': [
        'error',
        {
          children: 'never',
          props: 'never',
        },
      ],
      'react/jsx-no-useless-fragment': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-unstable-nested-components': 'warn',
      'react/self-closing-comp': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'unused-imports/no-unused-imports': 'error',
    },
  },
  eslintConfigPrettier,
);
