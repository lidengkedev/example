const path = require('path')
const Koa = require('koa')
const KoaStatic = require('koa-static')
const KoaRouter = require('koa-router')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
// 处理静态资源文件
app.use(new KoaStatic(path.resolve(__dirname, '../public')))
// 处理 post 请求参数
app.use(bodyParser())

const router = new KoaRouter()

// 开启 socket 服务
let socketList = []
const server = require('http').Server(app.callback())
const socketIO = require('socket.io')(server)

socketIO.on('connection', socket => {
    // 返回的 socketIo 对象可以用来给前端广播消息
    socketList.push(socket)
    // 前端调用 io()，即可连接成功
    console.log('a user connected')
})


const runCmd = () => {
    return new Promise((resolve, reject) => {
        const { spawn } = require('child_process')
        const child = spawn('sh', ['deploy.sh'])
        // const child = spawn('ls', ['-lh', '/usr'])

        let message = ''

        child.stdout.on('data', data => {
            // shell 执行的 log 在这里搜集，可以通过接口返回给前端
            console.log(`stdout: ${data}`)
            //socket 实时发送给前端
            socketIO.emit('deploy-log', `${data}`)
            // 普通接口仅能返回一次，需要把 log 都搜集到一次，在 end 时 返回给前端
            message += `${data}`
        })
        child.stdout.on('end', data => {
            // 执行完毕后，接口 resolve，返回给前端
            resolve(message)
        })
        child.stderr.on('data', data => {
            // 如果发生错误，错误从这里输出
            console.error(`stderr: ${data}`)
            //socket 实时发送给前端
            socketIO.emit('deploy-log', `${data}`)
            message += `${data}`
            // reject(data)
        })
        child.on('close', code => {
            // 执行完成后正常退出就是 0
            console.log(`child_process exited width code: ${code}`)
        })
    })
}

// 集成 session
app.keys = [`自定义安全字符`]
const CONFIG = {
    /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    key: 'koa:sess',
    maxAge: 0.5 * 3600 * 1000, // 0.5h
    /** (boolean) can overwrite or not (default true) */
    overwrite: true,
    /** (boolean) httpOnly or not (default true) */
    httpOnly: true,
    /** (boolean) signed or not (default true) */
    signed: true,
    /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    rolling: false,
    /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    renew: false
}
app.use(session(CONFIG, app))

router.post('/login', async ctx => {
    let { password } = ctx.request.body
    let code = 0, message = 'success'
    if (password === '123456') {
        ctx.session.isLogin = true
    } else {
        code = -1
        message = 'fail'
    }
    ctx.body = {
        code,
        message
    }
})

router.get('/deploy', async (ctx) => {
    // 执行部署
    let execFunc = () => runCmd()

    if (!ctx.session.isLogin) {
        ctx.body = {
            code: -2,
            message: '未登录'
        }
        return
    }
    try {
        let res = await execFunc()
        ctx.body = {
            code: 200,
            data: res,
            message: 'success'
        }
    }
    catch (err) {
        ctx.body = {
            code: 500,
            data: err.message,
            message: err.message
        }
    }
})

app.use(router.routes()).use(router.allowedMethods())
server.listen(3000, () => console.log(`listening to : http://localhost:3000`))