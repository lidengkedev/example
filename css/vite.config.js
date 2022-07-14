import { defineConfig } from 'vite'
import { config } from 'dotenv'
import path, { resolve } from 'path'
import fs from 'fs'

// 定义 CSS-README.md 文件的标题内容
const CSS_README_MD = `
# CSS 示例文件访问链接汇总目录
[TOC]
## CSS 文件示例
`
// 初始化写入 HTML-README.md 文件的标题内容
fs.writeFileSync(resolve(__dirname, '../CSS-README.md'), CSS_README_MD)

function setRollupOptionsInput () {
    
    const folder = fs.readdirSync(path.join(__dirname, 'pages'))

    const rollupOptionsInput = {
        main: resolve(__dirname, 'index.html')
    }
    folder.forEach(file => {
        if (file.includes('.html')) {

            // 读取每一个html文件，返回文本内容
            const file_steams = fs.readFileSync(resolve(__dirname, 'pages/' + file), { encoding: 'utf-8' })
            // 正则表达式：匹配 html 中 title 标签中的 文本内容
            const reg = new RegExp('(.*)<title>(.*?)</title>(.*)')

            // 字符串分割：获取 html 中 title 标签中的 文本内容
            const newFileName = file_steams.replace(reg, '$1(000)$2(000)$3').split('(000)')[1]

            // 读取 HTML-README.md 文件，返回 HTML-README.md 文件的文本内容
            let htmlReadmeMdFileSteam = fs.readFileSync(resolve(__dirname, '../CSS-README.md'), { encoding: 'utf-8' })

            // 追加 HTML-README.md 文本内容
            htmlReadmeMdFileSteam = htmlReadmeMdFileSteam + `- [${newFileName}](https://lidengkedev.github.io/example/css/pages/${file})\n`

            // 写入文本内容
            fs.writeFileSync(resolve(__dirname, '../CSS-README.md'), htmlReadmeMdFileSteam)

            const filename = file.slice(0, -5)
            rollupOptionsInput[filename] = resolve(__dirname, `pages/${file}`)
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