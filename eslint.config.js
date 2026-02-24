import js            from '@eslint/js';
import globals        from 'globals';
import reactHooks     from 'eslint-plugin-react-hooks';
import reactRefresh   from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([

  // ── Arquivos/pastas ignorados ──────────────────────────
  globalIgnores([
    'dist',
    'build',
    'node_modules',
    'public',
    '*.config.js',
    '*.config.ts',
  ]),

  // ── Configuração principal ─────────────────────────────
  {
    files: ['**/*.{js,jsx}'],

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion:  'latest',
      sourceType:   'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion:  'latest',
        ecmaFeatures: { jsx: true },
        sourceType:   'module',
      },
    },

    rules: {

      // ── Variáveis ──────────────────────────────────────
      'no-unused-vars': ['warn', {
        vars:               'all',
        args:               'after-used',
        ignoreRestSiblings: true,
        // Permite: componentes React (PascalCase), constantes (_PREFIX)
        varsIgnorePattern:  '^[A-Z_]',
        argsIgnorePattern:  '^_',
      }],
      'no-undef':            'error',
      'no-var':              'error',
      'prefer-const':        'warn',
      'no-console': ['warn', {
        allow: ['warn', 'error'],
      }],

      // ── Qualidade do código ────────────────────────────
      'eqeqeq':             ['error', 'always'],
      'no-duplicate-imports': 'error',
      'no-shadow':           'warn',
      'no-use-before-define': ['error', {
        functions: false,
        classes:   true,
        variables: true,
      }],

      // ── React Hooks ────────────────────────────────────
      'react-hooks/rules-of-hooks':   'error',
      'react-hooks/exhaustive-deps':  'warn',

      // ── React Refresh ──────────────────────────────────
      'react-refresh/only-export-components': ['warn', {
        allowConstantExport: true,
      }],
    },
  },
]);