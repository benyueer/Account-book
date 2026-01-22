/// <reference types="node" />
// @ts-check
import antfu from '@antfu/eslint-config'
import { fileURLToPath } from 'node:url'

export default antfu({
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  stylistic: {
    quotes: 'single',
    semi: false,
    indent: 2,
  },
  rules: {
    'ts/no-explicit-any': 'off',
    'style/array-element-newline': ['error', 'consistent'],
    'style/array-bracket-newline': ['error', { multiline: true }],
    'node/prefer-global/process': 'off',
  },
}, {
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: fileURLToPath(new URL('.', import.meta.url)),
    },
  },
})
