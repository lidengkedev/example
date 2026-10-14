/**
 * 1. 新建一个文件夹 html，用于存放一些原生的 html
 * 2. 获取 /dist/html 文件夹中所有的文件，并复制到 /dist/html 文件夹中
 * 3. 获取 /dist/html 中每个 html 文件中的 title 的内容和文件名，并保存在 /HTML-README.md 文件中
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

/****************************************************************
 * 1. 准备
 ****************************************************************/
const HTML_README_PATH = path.join(__dirname, 'HTML-README.md')
const DIST_DIR = path.join(__dirname, 'dist')

// HTML_README.md 文件内容
let HTML_README_CONTENT = '# HTML 示例\r\n\r\n'

// 1.1. 清空 dist 文件夹的所有文件
fs.rmSync(DIST_DIR, { recursive: true, force: true })

// 1.2. 判断 dist 文件夹是否存在，如果不存在则创建一个空的 dist 文件夹
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true })
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
function setHtmlReadmeFile(filename_path) {
  if (filename_path.includes('.html')) {

    // 读取每一个html文件，返回文本内容
    const file_steams = fs.readFileSync(resolve(filename_path), { encoding: 'utf-8' })

    // 正则表达式：匹配 html 中 title 标签中的 文本内容
    const reg = new RegExp('(.*)<title>(.*?)</title>(.*)')

    // 字符串分割：获取 html 中 title 标签中的 文本内容
    const newFileName = file_steams.replace(reg, '$1(000)$2(000)$3').split('(000)')[1]

    // 正则表达式：匹配 html 中的 <meta name="description" content=""> 中的文本内容
    const reg2 = new RegExp('(.*)<meta name="description" content="(.*)">(.*)')

    // 字符串分割：获取 html 中 description 文本内容
    const description = file_steams.replace(reg2, '$1(000)$2(000)$3').split('(000)')[1]

    // 读取 HTML-README.md 文件，返回 HTML-README.md 文件的文本内容
    // let htmlReadmeMdFileSteam = fs.readFileSync(HTML_README_PATH, { encoding: 'utf-8' })

    // 默认的链接地址
    let list_link_str = `- [${newFileName}](https://lidengkedev.github.io/example/${filename_path})\r\n`

    // 如果存在描述信息，给每个链接地址添加上描述信息
    if (description) {
      list_link_str = `- [${newFileName}](https://lidengkedev.github.io/example/${filename_path}): ${description}\r\n`
    }

    // 追加 HTML-README.md 文本内容
    // htmlReadmeMdFileSteam = htmlReadmeMdFileSteam + list_link_str

    // 逐条拼接 超链接 地址
    HTML_README_CONTENT = HTML_README_CONTENT + list_link_str

    // 写入文本内容
    // fs.writeFileSync(HTML_README_PATH, htmlReadmeMdFileSteam)
  }
}

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
function copyDirSync(dir, new_dir) {
  if (!fs.existsSync(resolve(new_dir))) {
    fs.mkdirSync(new_dir)// dist/html
  }
  // 获取文件中的所有文件，返回一个包含所有文件名和后缀的数组
  fs.readdirSync(resolve(dir)).forEach(filename => {
    const current_filename_path = `${dir}/${filename}`// html/xxx.html
    const new_dir_filename_path = `${new_dir}/${filename}`// dist/html/xxx.html
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
  setHtmlReadmeFile(filename_path)
  fs.copyFileSync(resolve(filename_path), resolve(new_filename_path))
}

// index.html 导航页
copyFileSync('index.html', 'dist/index.html')
console.log('==============================================')
console.log('index.html         => dist/index.html is complate.')

// html
copyDirSync('html', 'dist/html')
console.log('html               => dist/html is complate.')

// 卫星地图
copyDirSync('gis-map-demo', 'dist/gis-map-demo')
console.log('gis-map-demo       => dist/gis-map-demo is complate.')

// 科目三模拟考试
copyDirSync('car-subject-three', 'dist/car-subject-three')
console.log('car-subject-three  => dist/car-subject-three is complate.')

// CSS3 3d立体福字
copyDirSync('202001201356-3d-fu', 'dist/202001201356-3d-fu')
console.log('202001201356-3d-fu => dist/202001201356-3d-fu is complate.')

// 图片悬浮放大细节
copyDirSync('cloud-zoom', 'dist/cloud-zoom')
console.log('cloud-zoom         => dist/cloud-zoom is complate.')

// canvas 画布
copyDirSync('canvas', 'dist/canvas')
console.log('canvas             => dist/canvas is complate.')
console.log('==============================================')

// 生成 HTML-README.md 文件
fs.writeFileSync(HTML_README_PATH, HTML_README_CONTENT)
console.log('生成 HTML-README.md 文件.')
