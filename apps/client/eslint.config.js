// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  // 启用 React 相关规则
  react: true,
  // 启用 TypeScript 支持
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  // 启用 UnoCSS 相关规则
  unocss: true,
  // 代码风格设置
  stylistic: {
    quotes: 'single',
    semi: false,
    indent: 2,
  },
  // 自定义规则
  rules: {
    'array-element-newline': ['error', 'consistent'],
    'array-bracket-newline': ['error', { multiline: true }],
    'style/jsx-first-prop-new-line': ['error', 'multiline'],
    'style/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
    'ts/no-unsafe-assignment': 'off',
    'ts/no-unsafe-argument': 'off',
    'ts/strict-boolean-expressions': 'off',
    'ts/no-unsafe-member-access': 'off',
  },
  // 忽略文件
  ignores: [
    '**/dist',
    '**/node_modules',
    '**/.next',
    '**/out',
    '**/build',
    '**/coverage',
    '**/.moon/cache',
    'uno.config.ts', // 忽略 UnoCSS 配置文件
  ],
  // 添加 TypeScript 解析器选项
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
})
