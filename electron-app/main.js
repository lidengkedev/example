const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')
const { dockMenu } = require('./menu/main-menu')
const { loadThemeColor } = require('./utils/index')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            /**
             * 通过预加载脚本从渲染器访问Node.js
             * 在主进程通过Node的全局 process 对象访问这个信息是微不足道的。 
             * 然而，你不能直接在主进程中编辑DOM，因为它无法访问渲染器 文档 上下文。 
             * 它们存在于完全不同的进程！
             * 这是将 预加载 脚本连接到渲染器时派上用场的地方。 
             * 预加载脚本在渲染器进程加载之前加载，并有权访问两个 渲染器全局 (例如 window 和 document) 和 Node.js 环境。
             */
            preload: path.join(__dirname, './render/preload.js')
        }
    })
    win.loadFile('index.html')

    // Electron 应用程序从nativeTheme中获取主题颜色。
    // 使用 IPC 通道提供主题切换和重置控制。
    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light'
        } else {
            nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
    })
    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
    })
    // 监听主题变化
    nativeTheme.on('updated', () => {
        console.log('Updated Event has been Emitted !')
        if (nativeTheme.shouldUseDarkColors) {
            console.log('Dark Theme Chosen by User !')
            console.log(`Dark Theme Enabled - ${nativeTheme.shouldUseDarkColors}`)
            loadThemeColor('dark')
        } else {
            console.log('Light Theme chosen by User')
            console.log(`Light Theme Enabled - ${nativeTheme.shouldUseDarkColors}`)
            loadThemeColor('light')
        }
    })

    // 将进度栏添加到main window中
    // 该窗口会使用node.js的计时器实现随着时间的推移而进度增长。
    const INCREMENT = 0.03
    const INTERVAL_DELAY = 100
    let c = 0
    progressInterval = setInterval(() => {
        win.setProgressBar(c)
        if (c < 2) {
            c += INCREMENT
        } else {
            c = (-INCREMENT * 5)
        }
    }, INTERVAL_DELAY);
}

app.whenReady().then(() => {
    if (process.platform === 'darwin') {
        // 仅在 macOS 上可用。
        app.dock.setMenu(dockMenu)
    }
    createWindow()
    /**
     * 当 Linux 和 Windows 应用在没有窗口打开时退出了，
     * macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，
     * 并且在没有窗口可用的情况下激活应用时会打开新的窗口。
     * 为了实现这一特性，监听 app 模块的 activate 事件。
     * 如果没有任何浏览器窗口是打开的，则调用 createWindow() 方法。
     * 因为窗口无法在 ready 事件前创建，你应当在你的应用初始化后仅监听 activate 事件。 
     * 通过在您现有的 whenReady() 回调中附上您的事件监听器来完成这个操作。
     */
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('before-quit', () => {
    clearInterval(progressInterval)
})

// 在Windows和Linux上，关闭所有窗口通常会完全退出一个应用程序。
// 为了实现这一点，你需要监听 app 模块的 'window-all-closed' 事件。
// 如果用户不是在 macOS(darwin) 上运行程序，则调用 app.quit()。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
