import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import contentCollections from '@content-collections/vite'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    contentCollections(),
    tsconfigPaths(),
    tanstackStart({
      srcDirectory: 'src',
      server: {
        preset: process.env.BUILD_TARGET === 'bun' ? 'bun' : 'vercel',
      },
    }),
    viteReact(),
  ],
})
