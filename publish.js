/**
 * 1. 新建一个文件夹 htmls，用于存放一些原生的 html
 * 2. 获取 /dist/htmls 文件夹中所有的文件，并复制到 /dist/htmls 文件夹中
 * 3. 获取 /dist/htmls 中每个 html 文件中的 title 的内容和文件名，并保存在 /HTML-README.md 文件中
 */
const path = require('path')
const fs = require('node:fs')

/**
 * 获取绝对路径
 * @param {String} url 
 * @returns url
 */
function resolve(url) {
    return path.resolve(__dirname, url)
}

/**
 * 递归删除文件夹所有文件
 * 1. 首先判断当前文件夹是否存在
 * 2. 遍历文件夹中的文件和子文件夹
 * 3. 删除当前文件中的文件
 * 4. 递归调用删除子文件夹中的文件
 * @param {*} dir 
 */
function removeDirSync(dir) {
    // 判断文件夹是否存在
    if (fs.existsSync(resolve(dir))) {
        // 读取文件夹中的文件和文件夹
        fs.readdirSync(resolve(dir)).forEach(filename => {
            const current_filename_path = `${dir}/${filename}` // dist/htmls/xxx.[ext]
            // 如果是文件，则删除文件
            if (filename.includes('.')) {
                // 删除文件
                fs.rmSync(resolve(current_filename_path))
            } else {
                // 如果是文件夹则递归删除
                removeDirSync(current_filename_path)
            }
        })
        // 删除文件夹中的文件后，并删除文件夹
        fs.rmdirSync(resolve(dir))
    }
}

// 清空 dist/htmls 文件夹
// fs.rmdirSync(path.resolve(__dirname, 'dist/htmls/'), { recursive: true })
removeDirSync('dist/htmls/')

/**
 * 复制文件夹
 * 1. 首先判断新文件夹是否存在
 * 2. 创建新文件夹
 * 3. 遍历原文件夹中的文件和子文件夹
 * 4. 复制原文件到新文件夹中
 * 5. 判断新文件夹中的子文件夹是否存在
 * 6. 新建新文件夹中的子文件夹
 * 7. 递归调用复制原文件夹中的子文件夹
 * @param {*} dir 要复制的文件夹相对路径
 * @param {*} new_dir 复制后的文件夹行对路径
 */
function copyDirSync (dir, new_dir) {
    if (!fs.existsSync(resolve(new_dir))) {
        fs.mkdirSync(new_dir)// dist/htmls
    }
    // 获取文件中的所有文件，返回一个包含所有文件名和后缀的数组
    fs.readdirSync(resolve(dir)).forEach(filename => {
        const current_filename_path = `${dir}/${filename}`// htmls/xxx.html
        const new_dir_filename_path = `${new_dir}/${filename}`// dist/htmls/xxx.html
        if (!filename.includes('.')) {
            // 复制子文件夹
            if (fs.existsSync(resolve(current_filename_path))) {
                copyDirSync(current_filename_path, new_dir_filename_path)
            } else {
                // 复制文件
                copyFileSync(current_filename_path, new_dir_filename_path)
            }
        } else {
            // 复制文件
            copyFileSync(current_filename_path, new_dir_filename_path)
        }
    })
}

/**
 * 复制文件
 * 1. 复制的新文件的链接地址写入到 HTML-README.md 文件中
 * 2. 复制文件到新文件夹中
 * @param {*} filename 要复制的文件相对路径
 * @param {*} newFilename 复制后的文件相对路径
 */
function copyFileSync(filename_path, new_filename_path) {
    setHtmlReadmeFile(filename_path, 'HTML-README.md')
    fs.copyFileSync(resolve(filename_path), resolve(new_filename_path))
}

/**
 * 把新文件的链接地址写入到 HTML-README.md 文件中
 * 1. 判断文件是否是一个 html 文件
 * 2. 读取文件的流
 * 3. 通过正则校验和字符串分割获取文件的标题文本
 * 4. 追加文件的标题文本和对应的文件链接地址到 HTML-README.md 文件中
 * @param {*} filename_path 
 * @param {*} readme_file 
 */
function setHtmlReadmeFile(filename_path, readme_file) {
    if (filename_path.includes('.html')) {
        // 读取每一个html文件，返回文本内容
        const file_steams = fs.readFileSync(resolve(filename_path), { encoding: 'utf-8' })
        // 正则表达式：匹配 html 中 title 标签中的 文本内容
        const reg = new RegExp('(.*)<title>(.*?)</title>(.*)')
        // 字符串分割：获取 html 中 title 标签中的 文本内容
        const newFileName = file_steams.replace(reg, '$1(000)$2(000)$3').split('(000)')[1]
        // 读取 HTML-README.md 文件，返回 HTML-README.md 文件的文本内容
        let htmlReadmeMdFileSteam = fs.readFileSync(resolve(readme_file), { encoding: 'utf-8' })
        // 追加 HTML-README.md 文本内容
        htmlReadmeMdFileSteam = htmlReadmeMdFileSteam + `- [${newFileName}](https://lidengkedev.github.io/example/${filename_path})\n`
        // 写入文本内容
        fs.writeFileSync(resolve(readme_file), htmlReadmeMdFileSteam)
    }
}

/**
 * 写入 HTML-README.md 文件初始化的内容
 */
function createHtmlReadmeFile() {
    // 定义 HTML-README.md 文件的标题内容
    const HTML_README_MD = (
        '# HTML 示例文件访问链接汇总目录\n' +
        '[TOC]\n' +
        '## HTML 文件示例\n'
    )
    // 初始化写入 HTML-README.md 文件的标题内容
    fs.writeFileSync(resolve('HTML-README.md'), HTML_README_MD)
}

// 写入文件链接
createHtmlReadmeFile()

// 复制文件夹
copyDirSync('htmls', 'dist/htmls')


