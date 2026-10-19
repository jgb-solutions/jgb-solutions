/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: false,
    // examples/ holds archived designs that are not wired into the app
    include: ['src/**/*.test.{ts,tsx}'],
    alias: {
      'content-collections': path.resolve(__dirname, './src/test/mocks/content-collections.ts'),
    },
  },
})
