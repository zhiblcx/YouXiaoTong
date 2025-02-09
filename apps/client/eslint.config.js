import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    extends: ['@nuxt/eslint-config'],
    plugins: ['@nuxt/eslint-plugin'],
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
]
