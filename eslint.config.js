import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';
import vercelBaseRules from '@vercel/style-guide/eslint/node' assert { type: 'json' };

export default [
  // 1. Ignore build artifacts 
  { ignores: ['dist', 'node_modules'] },

  // 2. Core JavaScript & Global Environment configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    // 3. Merging React & Vercel's official styling specifications
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...vercelBaseRules.rules, // Injects Vercel's strict code-quality rules

      // Vercel Defaults overrides for React Web environments
      'react/react-in-jsx-scope': 'off', // Not needed in Vite/Modern React
      'react/jsx-uses-react': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // 4. Force Prettier overrides last to eliminate layout style clashes
  prettierConfig,
];
