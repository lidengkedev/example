#!/usr/bin/env node

/** 
 * 怎么在 npm 包中集成 cli 命令
 * 
 * 例如：在 npm install @vue/cli -g 后，会在环境变量中添加一个 vue 命令。
 * 使用 vue create xx 可初始化一个项目。
 * 一般这种形式就是 cli 工具。 
 * 
 * 一般在 package.json 中有一个 bin 属性，用于创建该 npm 包的自定义命令
 * 
 * { "bin": { "deploy": "./bin/deploy.js" }}
 * 
 * 上的配置意思是: 全局安装 npm install xx -g 后，生成 zuodeploy 命令，运行该命令时，会执行 bin/zuodeploy.js
 * 
 * 一般 cli 都会使用 commander 来生成帮助文档，管理指令逻辑。
 * 
 * 本地开发时，配置好后，在当前目录下运行 sudo npm link 即可将 zuodeploy 命令链接到本地的环境变量里。
 * 任何 terminal 里面运行 zuodeploy 都会执行当前项目下的这个文件。
 * 解除可以使用 npm unlink
 * */

const { program } = require("commander")
const prompts = require("prompts")
program.version(require("../package.json").version)

program
    .command("start")
    // description + action 可防止查找 command拼接文件
    .description("开启部署监听服务")
    .action(async () => {
        const args = await prompts([
            {
                type: 'number',
                name: 'port',
                initial: 3000,
                message: '请指定部署服务监听端口：',
                validate: value => {
                    value !== '' && (value < 3000 || value > 10000)
                        ? `端口号必须在 3000 - 10000 之间`
                        : true
                }
            }, {
                type: 'password',
                name: 'password',
                initial: '123456',
                message: '请设置登录密码(默认：123456)',
                validate: value => (value.length < 6 ? `密码需要 6 位以上` : true)
            }
        ])
        // args 为 { port: 3000, password: '123456' }
        require('./start')(args)
    })
program.parse()