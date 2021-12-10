import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const host = process.env.NODE_ENV.VITE_APP_HOST
const port = process.env.NODE_ENV.VITE_APP_PORT

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host,
    port
  },
  build: {
    outDir: 'dist',
    manifest: false,
    rollupOptions: {
      input: {
        'example/indexedDB': resolve(__dirname, 'example/indexedDB/index.html')
      },
      output: {}
    }
  }
})
