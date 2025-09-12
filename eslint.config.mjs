import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginNext from '@next/eslint-plugin-next';
import eslintPluginPrettier from 'eslint-plugin-prettier'; // ✅ Import the plugin

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Next.js core config
  ...compat.extends('next/core-web-vitals'),

  // Next.js plugin and rules
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
    },
  },

  // ✅ Define Prettier plugin and its rule in the SAME object
  {
    plugins: {
      prettier: eslintPluginPrettier, // Define the plugin
    },
    rules: {
      'prettier/prettier': 'warn', // Apply the rule
    },
  },
];
