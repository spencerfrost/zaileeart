import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const sharedRules = {
  // Remove any formatting rules that might conflict with Prettier
  indent: 'off',
  'max-len': 'off',
  'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
  // Keep non-formatting related rules
  'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  'no-var': 'error',
  'object-curly-spacing': 'off',

  'prefer-const': 'error',
  'prefer-template': 'warn',
  quotes: 'off',
  semi: 'off',
  'space-before-function-paren': 'off',
};

/**
 * Custom ESLint rules
 *
 * @type {import('eslint').Linter.FlatConfig}
 */
export const customEslintRules = {
  rules: {
    ...sharedRules,
    // Add any project-specific rules here
  },
};

/**
 * Dirs and files to ignore
 *
 * @type {import('eslint').Linter.FlatConfig}
 */
export const customIgnores = {
  ignores: [
    '**/node_modules',
    '**/public',
    '**/vendor',
    '**/dist',
    '**/.nuxt',
    '**/*.min.js',
    '**/coverage',
  ],
};

/**
 * For usage within a Nuxt context
 */
export const eslintConfigNuxt = [
  perfectionist.configs['recommended-natural'],
  customEslintRules,
  customIgnores,
  {
    rules: {
      // Add any Nuxt-specific rules here
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          multiline: 'always',
          singleline: 'never',
        },
      ],
      'vue/html-indent': ['error', 2],
      'vue/max-attributes-per-line': [
        'error',
        {
          multiline: 1,
          singleline: 3,
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
];

/**
 * For standalone usage in packages without Nuxt context
 */
export const eslintConfigStandalone = createConfigForNuxt({
  features: { tooling: true },
}).append(
  perfectionist.configs['recommended-natural'],
  customEslintRules,
  customIgnores,
  eslintPluginPrettierRecommended
);
