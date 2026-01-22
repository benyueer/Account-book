import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: true,
  unocss: true,
  formatters: true,
  stylistic: {
    quotes: 'single',
    semi: false,
    indent: 2,
  },
  rules: {
    'style/array-element-newline': ['error', 'consistent'],
    'style/array-bracket-newline': ['error', { multiline: true }],
    'style/jsx-first-prop-new-line': ['error', 'multiline'],
    'style/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
  },
})
