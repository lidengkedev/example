import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  let base = '/'

  if (command === 'build' && mode === 'production') {

    base = 'https://lidengkedev.github.io/example/'

    console.log(`
      +++++++++++++++++++++++++++++++++++++++++++++++++
      +             npm run build                     +
      +             command ===> build                +
      +             mode ======> production           +
      +++++++++++++++++++++++++++++++++++++++++++++++++
    `)
  } else if (command === 'serve' && mode === 'production') {

    console.log(`
      +++++++++++++++++++++++++++++++++++++++++++++++++
      +             npm run preview                   +
      +             command ===> serve                +
      +             mode ======> production           +
      +++++++++++++++++++++++++++++++++++++++++++++++++
    `)
  } else {
    console.log(`
      +++++++++++++++++++++++++++++++++++++++++++++++++
      +             npm run serve                     +
      +             command ===> serve                +
      +             mode ======> development          +
      +++++++++++++++++++++++++++++++++++++++++++++++++
    `)
  }

  return {
    base,
    plugins: [vue()],
    server: {
      host: 'localhost',
      port: 9000
    },
    preview: {
      host: 'localhost',
      port: 9001
    },
    build: {
      outDir: 'dist',
      manifest: false,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          'example/index': resolve(__dirname, 'example/index.html'),
          'example/indexedDB': resolve(__dirname, 'example/indexedDB.html'),
          'example/flex': resolve(__dirname, 'example/flex.html'),
          'example/page-03': resolve(__dirname, 'example/page-03.html'),
          'example/page-04': resolve(__dirname, 'example/page-04.html'),
        }
      }
    }
  }
})
