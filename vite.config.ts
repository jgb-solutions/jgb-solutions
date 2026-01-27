import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import contentCollections from '@content-collections/vite'

export default defineConfig({
  plugins: [
    contentCollections(),
    tsconfigPaths(),
    tanstackStart({
      srcDirectory: 'src',
      server: {
        preset: process.env.BUILD_TARGET === 'vercel' ? 'vercel' : 'bun',
      },
    }),
    viteReact(),
  ],
})
