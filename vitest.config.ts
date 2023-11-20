import { configDefaults, defineConfig } from 'vitest/config'
import swc from 'unplugin-swc'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, '**/data/pg/**'],
    globals: true,
    root: './',
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
    tsConfigPaths(),
  ],
})
