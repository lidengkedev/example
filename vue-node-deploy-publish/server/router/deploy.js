const KoaRouter = require('koa-router')

const router = new KoaRouter()

router.get('/deploy', async (ctx) => {
    // 执行部署
    let execFunc = () => runCmd()

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

module.exports = router