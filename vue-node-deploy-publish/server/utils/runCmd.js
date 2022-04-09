/**
 * node 内置模块 child_process 下 spawn 执行 terminal 命令，
 * 包括执行 shell 脚本的 sh 脚本文件.sh 命令
 */
const { spawn } = require('child_process')

const ls = spawn('ls', ['-lh', '/usr'])
// const ls = spawn('ls', ['utils/deploy.sh'])

ls.stdout.on('data', data => {
    // ls 产生的 terminal log 在这里 console
    console.log(`stdout: ${data}`)
})

ls.stderr.on('data', data => {
    // 如果发生错误，错误从这里输出
    console.error(`stderr: ${data}`)
})

ls.on('close', code => {
    // 执行完成后正常退出就是 0
    console.log(`child_process exited width code: ${code}`)
})
