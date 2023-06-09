module.exports = {
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['unused-imports'],
  rules: {
    'import/no-unresolved': 'off',
    'import/absolute-first': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/label-has-associated-control': 'off', // it's stupid and don't get htmlFor association
    'react/require-default-props': 'off', // we're using typescript, don't need that
    'react/react-in-jsx-scope': 'off', // from react 17 it's not needed anymore
    'react/jsx-props-no-spreading': 'off', // need it sometimes, for example for _app.tsx next
    'react/function-component-definition': 'off',
    'no-nested-ternary': 'warn',
    'unused-imports/no-unused-imports': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
        groups: [
          ['builtin', 'external'],
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@react*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'scss',
            group: 'object',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['airbnb-typescript'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/comma-dangle': 'off', // prettier will handle this
        '@typescript-eslint/indent': 'off', // as above
        '@typescript-eslint/no-unused-vars': 'warn',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/ban-types': [
          'warn',
          {
            types: {
              'React.FC': {
                message:
                  'React.FC is discouraged. Add your props typing explicitly.',
              },
              'React.FunctionComponent': {
                message:
                  'React.FC is discouraged. Add your props typing explicitly.',
              },
              // React.FC is discouraged. Some reading:
              // https://github.com/facebook/create-react-app/pull/8177
              // https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/
            },
          },
        ],
      },
    },
  ],
};
