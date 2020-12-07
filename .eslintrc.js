module.exports = {
  extends: [
    'noftalint',
    'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['.eslintrc.js', 'node_modules/', 'dist/'],
  reportUnusedDisableDirectives: true,
  env: {
    node: true,
  },
  rules: {
    'guard-for-in': 'off',
    'max-classes-per-file': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      }
   ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        'extensions': ['.js', '.jsx', '.ts', '.tsx'],
      }
    },
    node: {
      tryExtensions: ['.js', '.json', '.node', '.ts', '.d.ts']
    },
  },
};
