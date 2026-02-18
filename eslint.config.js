import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {ignores: ['dist']},
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked, // Maximum TS strictness
      ...tseslint.configs.stylisticTypeChecked // Enforces consistent patterns
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],

      // Tightened Rules for Helldiver-level Discipline:
      '@typescript-eslint/no-explicit-any': 'error', // No 'any' escape hatches [cite: 24]
      '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-floating-promises': 'error', // Crucial for async stability [cite: 66]
      'no-console': ['warn', {allow: ['warn', 'error']}]
    }
  }
);
