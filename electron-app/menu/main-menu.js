const { Menu, MenuItem, nativeTheme, BrowserWindow } = require('electron')
const path = require('path')

// 配置菜单快捷键
const menu = new Menu()

const menu_file = new MenuItem({
    label: '文件(F)',
    submenu: [
        {
            role: 'window',
            label: '打开新窗口',
            click: () => {
                var newWindow = new BrowserWindow({
                    width: 800,
                    height: 500,
                    webPreferences: {
                        nodeIntegration: true
                    },
                    darkTheme: true
                })
                newWindow.loadFile(path.join(__dirname, '../pages/new-winow.html'))
                newWindow.on('closed', () => {
                    newWindow = null
                })
            }
        },
        {
            role: 'window',
            label: '窗口'
        },
        {
            role: 'reload',
            label: '重载'
        },
        {
            label: '首选项',
            submenu: [
                {
                    label: '颜色主题',
                    accelerator: process.platform = 'darwin' ? 'Ctrl + T' : 'Ctr + K',
                    click: () => {
                        console.log('Electron Change ThemeColor !')
                        nativeTheme.themeSource = 'dark'
                    }
                }
            ]
        },
        {
            role: 'quit',
            label: '退出'
        }
    ]
})
const menu_edit = new MenuItem({
    label: '编辑(E)',
    submenu: [
        {
            role: 'copy',
            label: '复制'
        },
        {
            role: 'cut',
            label: '剪切'
        },
        {
            role: 'paste',
            label: '粘贴'
        }
    ]
})
const menu_selector = new MenuItem({
    label: '选择(S)'
})
const menu_view = new MenuItem({
    label: '查看(V)'
})
const menu_goto = new MenuItem({
    label: '转到(G)'
})
const menu_runner = new MenuItem({
    label: '运行(R)'
})
const menu_template = new MenuItem({
    label: '终端(T)'
})
const menu_help = new MenuItem({
    label: '帮助(H)',
    submenu: [
        {
            role: 'help',
            label: '帮助',
            accelerator: process.platform === 'darwin' ? 'Alt + Cmd + I' : 'Alt + Shift + I',
            click: () => {
                console.log('Electron rocks !')
            }
        },
        {
            role: 'toggleDevTools',
            label: '开发工具'
        }
    ]
})
menu.append(menu_file)
menu.append(menu_edit)
menu.append(menu_selector)
menu.append(menu_view)
menu.append(menu_goto)
menu.append(menu_runner)
menu.append(menu_template)
menu.append(menu_help)

Menu.setApplicationMenu(menu)

// 仅在 macOS 上可用。
const dockMenu = Menu.buildFromTemplate([
    {
        label: '新窗口',
        click: () => {
            console.log('Electron New Window')
        }
    }, {
        label: '新窗口设置',
        submenu: [
            { label: 'Basic' },
            { label: 'Pro' }
        ]
    }, {
        label: '新命令'
    }
])

exports.dockMenu = dockMenu
exports.module = {
    menu,
    dockMenu
}