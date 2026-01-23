import { fileURLToPath } from 'node:url'
/// <reference types="node" />
// @ts-check
import antfu from '@antfu/eslint-config'

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
    'ts/strict-boolean-expressions': 'off',
    'no-console': 'off',
    'ts/no-unsafe-member-access': 'off',
    'ts/no-unsafe-assignment': 'off',
    'ts/no-unsafe-call': 'off',
  },
}, {
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: fileURLToPath(new URL('.', import.meta.url)),
    },
  },
})
