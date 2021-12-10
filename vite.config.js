import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const host = process.env.VITE_APP_HOST
const port = process.env.VITE_APP_PORT
const base = process.env.VITE_APP_BASE

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [vue()],
  server: {
    host,
    port
  },
  preview: {
    host,
    port
  },
  build: {
    outDir: 'release',
    manifest: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        example: resolve(__dirname, 'example/indexedDB.html')
      }
    }
  }
})
