module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['standard', 'plugin:ava/recommended'],
  rules: {
    'space-before-function-paren': 0,
    'no-console': ['warn'],
    'arrow-parens': ['error', 'always'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'never'],
    'brace-style': ['error', '1tbs'],
    'prefer-template': 'error',
    'object-curly-spacing': ['error', 'always'],
    'no-var': ['error'],
    semi: [2, 'always'],
    'ava/assertion-arguments': 'error',
    'ava/max-asserts': ['off', 5],
    'ava/no-async-fn-without-await': 'error',
    'ava/no-cb-test': 'off',
    'ava/no-duplicate-modifiers': 'error',
    'ava/no-identical-title': 'error',
    'ava/no-ignored-test-files': 'off',
    'ava/no-invalid-end': 'error',
    'ava/no-nested-tests': 'error',
    'ava/no-only-test': 'error',
    'ava/no-skip-assert': 'error',
    'ava/no-skip-test': 'error',
    'ava/no-statement-after-end': 'error',
    'ava/no-todo-implementation': 'error',
    'ava/no-todo-test': 'warn',
    'ava/no-unknown-modifiers': 'error',
    'ava/prefer-async-await': 'error',
    'ava/prefer-power-assert': 'off',
    'ava/test-ended': 'error',
    'ava/test-title': ['error', 'if-multiple'],
    'ava/use-t-well': 'error',
    'ava/use-t': 'error',
    'ava/use-test': 'error',
    'ava/use-true-false': 'error'
  },
  globals: {
    AppLogger: true,
    ServiceError: true
  },
  plugins: ['standard', 'promise', 'ava']
};
