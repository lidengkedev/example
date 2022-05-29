import { defineConfig } from 'vite'
import { config } from 'dotenv'
import path, { resolve } from 'path'
import fs from 'fs'

function setRollupOptionsInput () {
    const folder = fs.readdirSync(path.join(__dirname, 'page'))
    const rollupOptionsInput = {
        main: resolve(__dirname, 'index.html')
    }
    folder.forEach(file => {
        if (file.includes('.html')) {
            const filename = file.slice(0, -5)
            rollupOptionsInput[filename] = resolve(__dirname, `page/${file}`)
        }
    })
    return rollupOptionsInput
}


export default defineConfig(({ command, mode }) => {
    if (command === 'serve' && mode === 'production') {
        config({ path: path.resolve(process.cwd(), `.env.staging`) })
    } else {
        config({ path: path.resolve(process.cwd(), `.env.${mode}`) })
    }
    console.log('================================================>: ' + command)
    console.log('================================================>: ' + `.env.${mode}`)
    console.log('================================================>: ' + process.env.VITE_BASE)
    console.log('================================================>: ' + process.env.VITE_OUT_DIR)
    return {
        // envDir: '/',
        // envPrefix: 'VITE_',
        base: process.env.VITE_BASE,
        preview: {
            host: 'localhost',
            port: 5000
        },
        build: {
            // outDir: path.join(__dirname, '../dist/css'),
            // outDir: 'dist',
            outDir: process.env.VITE_OUT_DIR,
            manifest: true,
            rollupOptions: {
                input: setRollupOptionsInput()
            }
        }
    }
})