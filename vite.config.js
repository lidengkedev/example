import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let base = '/',
    host = 'localhost',
    port = 9000
  if (command === 'build' && mode === 'production') {
    base = 'https://lidengkedev.github.io/example/release/'
  }
  return {
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
          'example/indexedDB': resolve(__dirname, 'example/indexedDB.html'),
          'example/flex': resolve(__dirname, 'example/flex.html')
        }
      }
    }
  }
})
