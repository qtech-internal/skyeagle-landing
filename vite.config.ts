import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// Each public page is its own HTML entry, so /privacy/ and /delete-account/
// are real URLs on any static host. The store listings link to them directly,
// which a client-side route could not guarantee.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy/index.html'),
        deleteAccount: resolve(import.meta.dirname, 'delete-account/index.html'),
      },
    },
  },
})
