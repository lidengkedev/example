// 注意：node@^16.18.0 版本需要使用 inquirer@^8.0.0版本
const inquirer = require('inquirer')
const { execSync } = require('child_process')
const { readdirSync } = require('fs')
const { resolve } = require('path')

class FileRename {
  constructor() {}
  async init () {
    let files = await readdirSync(resolve(__dirname, '.'))
    console.log(files)
  }
  setChinese() {}
  setEnglish() {}
}

let file = new FileRename()

inquirer.prompt([{
  name: 'program',
  type: 'list',
  message: '请选择要启动的子应用',
  choices: [
    { name: '初始化目录', value: 1 },
    { name: '中文转英文', value: 2 },
    { name: '英文转中文', value: 3 }
  ]
}]).then(async answers => {
  if (answers.program === 1) {
    execSync('ls -a', { stdio:'inherit' })
    file.init()
    console.log('初始化目录')
  } else if (answers.program === 2) {
    console.log('中文转英文')
  } else if (answers.program === 3) {
    console.log('英文转中文')
  } else {
    console.log('暂无')
  }
})