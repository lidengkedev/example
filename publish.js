/**
 * 1. 新建一个文件夹 htmls，用于存放一些原生的 html
 * 2. 获取 /dist/htmls 文件夹中所有的文件，并复制到 /dist/htmls 文件夹中
 * 3. 把 /dist/htmls 文件夹中所有的 html 的文件名改为 uuid
 * 4. 获取 /dist/htmls 中每个 html 文件中的 title 的内容和文件名，并保存在 /HTML-README.md 文件中
 */
const path = require('path')
const fs = require('node:fs')

/**
 * 生成一个 uuid 值
 * @returns uuid
 */
function createUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0
        const v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

/**
 * 获取绝对路径
 * @param {String} url 
 * @returns url
 */
function resolve(url) {
    return path.resolve(__dirname, url)
}

/**
 * 清空 /dist/htmls/ 文件夹文件
 */
function removeFile(path) {
    fs.readdirSync(resolve(path)).forEach(filename => {
        fs.rmSync(resolve(path + filename))
    })
}

// 清空文件夹
// fs.rmdirSync(path.resolve(__dirname, 'dist/htmls/'), { recursive: true })
removeFile('dist/htmls/')

// 获取文件中的所有文件，返回一个包含所有文件名和后缀的数组
const folder = fs.readdirSync(path.resolve(__dirname, 'htmls'))

// 定义 HTML-README.md 文件的标题内容
const HTML_README_MD = `
# HTML 示例文件访问链接汇总目录
[TOC]
## HTML 文件示例
`

// 初始化写入 HTML-README.md 文件的标题内容
fs.writeFileSync(resolve('HTML-README.md'), HTML_README_MD)

// 遍历所有文件
folder.forEach((filename) => {

    // 读取每一个html文件，返回文本内容
    const file_steams = fs.readFileSync(resolve('htmls/' + filename), { encoding: 'utf-8' })

    // 正则表达式：匹配 html 中 title 标签中的 文本内容
    const reg = new RegExp('(.*)<title>(.*?)</title>(.*)')

    // 字符串分割：获取 html 中 title 标签中的 文本内容
    const newFileName = file_steams.replace(reg, '$1(000)$2(000)$3').split('(000)')[1]

    // 判断文件夹是否存在
    if (fs.existsSync(resolve('dist/htmls/')) === false) {
        // 创建文件夹 /dist/htmls
        fs.mkdirSync(resolve('dist/htmls/'))
    }

    // 生成一个 uuid
    const uuid = createUuid()

    // 复制文件到 /dist/htmls/ 文件夹中
    fs.copyFileSync(resolve('htmls/' + filename), resolve('dist/htmls/' + uuid + '.html'))

    // 读取 HTML-README.md 文件，返回 HTML-README.md 文件的文本内容
    let htmlReadmeMdFileSteam = fs.readFileSync(resolve('HTML-README.md'), { encoding: 'utf-8' })

    // 追加 HTML-README.md 文本内容
    htmlReadmeMdFileSteam = htmlReadmeMdFileSteam + `- [${newFileName}](https://lidengkedev.github.io/example/htmls/${uuid}.html)`
    
    // 写入文本内容
    fs.writeFileSync(resolve('HTML-README.md'), htmlReadmeMdFileSteam)
})

