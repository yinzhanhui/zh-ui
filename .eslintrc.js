module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  extends: ['eslint-config-airbnb-base'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/naming-convention': 0,
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
    'object-curly-newline': 'off',
    'import/newline-after-import': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-undef': 'off',
    'max-len': 'off',
    'no-useless-escape': 'off',
    'operator-linebreak': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'prefer-arrow-callback': 'off',
    'comma-dangle': 'off',
    'no-unused-vars': ['error', { varsIgnorePattern: '.*', args: 'none' }],
  },
  globals: {
    window: true,
    alert: true,
  },
};
