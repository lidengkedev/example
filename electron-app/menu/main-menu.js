const { Menu, MenuItem, nativeTheme, BrowserWindow } = require('electron')
const path = require('path')

// 配置菜单快捷键
const menu = new Menu()

const menu_file = new MenuItem({
    label: '文件(F)',
    submenu: [
        {
            label: '新建文件'
        },
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
                    backgroundColor: '#000',
                    darkTheme: true
                })
                newWindow.loadFile(path.join(__dirname, '../pages/new-winow.html'))
                newWindow.on('closed', () => {
                    newWindow = null
                })
            }
        },
        { type: 'separator' },
        { label: '打开文件...' },
        { label: '打开文件夹...' },
        { label: '从文件打开工作区...' },
        { label: '打开最近的文件',
            submenu: [
                { label: '重新打开已关闭的编辑器' },
                { type: 'separator' },
                { label: 'E:\github.com\example' },
                { type: 'separator' },
                { label: '更多' },
                { type: 'separator' },
                { label: '清除最近打开记录' }
            ]
        },
        { type: 'separator' },
        { label: '将文件添加到工作区...' },
        { label: '将工作区另存为...' },
        { label: '复制工作区' },
        { type: 'separator' },
        { label: '保存' },
        { label: '另存为...' },
        { label: '全部保存' },
        { type: 'separator' },
        { label: '自动保存' },
        {
            label: '首选项',
            submenu: [
                { label: '设置' },
                { label: '联机服务设置' },
                { label: '遥测设置' },
                { label: '扩展' },
                { type: 'separator' },
                { label: '键盘快捷键方式' },
                { label: '从 -  中迁移键盘快捷键方式' },
                { type: 'separator' },
                { label: '用户片段' },
                {
                    label: '颜色主题',
                    accelerator: process.platform = 'darwin' ? 'Ctrl + T' : 'Ctr + K',
                    click: () => {
                        console.log('Electron Change ThemeColor !')
                        if (nativeTheme.shouldUseDarkColors) {
                            nativeTheme.themeSource = 'light'
                        } else {
                            nativeTheme.themeSource = 'dark'
                        }
                    }
                },
                { type: 'separator' },
                { label: '文件图标主题' },
                { label: '产品图标主题' },
                { type: 'separator' },
                { label: '设置同步已打开' }
            ]
        },
        { type: 'separator' },
        { label: '还原文件' },
        { label: '关闭编辑器' },
        { label: '关闭文件夹' },
        { role: 'close', label: '关闭窗口' },
        { type: 'separator' },
        { role: 'quit', label: '退出' }
    ]
})
const menu_edit = new MenuItem({
    label: '编辑(E)',
    submenu: [
        { label: '撤销' },
        { label: '恢复' },
        { type: 'separator' },
        { role: 'cut', label: '剪切' },
        { role: 'copy', label: '拷贝' },
        { role: 'copy', label: '拷贝为',
            submenu: [
                { label: '拷贝远程文件地址' },
                { label: '拷贝远程文件地址从...' }
            ]
        },
        { role: 'paste', label: '粘贴' },
        { type: 'separator' },
        { label: '发现' },
        { label: '替换' },
        { type: 'separator' },
        { label: '在文件中查找' },
        { label: '在文件中替换' },
        { type: 'separator' },
        { label: '切换行注释' },
        { label: '切换块注释' },
        { label: '缩进' }
    ]
})
const menu_selector = new MenuItem({
    label: '选择(S)',
    submenu: [
        { label: '全选' },
        { label: '选中右侧' },
        { label: '取消选中' },
        { type: 'separator' },
        { label: '拷贝上一行' },
        { label: '拷贝下一行' },
        { label: '向上移动一行' },
        { label: '向下移动一行' },
        { label: '向下拷贝一行' },
        { type: 'separator' },
        { label: 'Add Cursor Above' },
        { label: 'Add Cursor Below' },
        { label: 'Add Cursor to line Ends' },
        { label: 'Add Next Occurrence' },
        { label: 'Add Previous Occurrence' },
        { label: 'Select All Occurrence' },
        { type: 'separator' },
        { label: '切换为“Ctrl + 单击”进行多光标功能' },
        { label: '列选择模式' }
    ]
})
const menu_view = new MenuItem({
    label: '查看(V)',
    submenu: [
        { label: '命令面板' },
        { label: '打开视图' },
        { type: 'separator' },
        { label: '外观',
            submenu: [
                { label: '全屏' },
                { label: '禅模式' },
                { label: '居中布局' },
                { type: 'separator' },
                { type: 'checkbox', checked: true, label: '显示菜单' },
                { type: 'checkbox', checked: true, label: '显示侧边栏' },
                { type: 'checkbox', checked: true, label: '显示状态栏' },
                { type: 'checkbox', checked: true, label: '显示活动栏' },
                { type: 'checkbox', checked: true, label: '显示面板' },
                { type: 'checkbox', checked: true, label: '显示编辑区域' },
                { type: 'separator' },
                { label: '向右移动侧边栏' },
                { label: '将面板移至右侧' },
                { label: '将面板移至左侧' },
                { type: 'separator' },
                { label: '放大' },
                { label: '缩小' },
                { label: '重置缩放' }
            ]
        },
        { label: '编辑器布局',
            submenu: [
                { label: '向上拆分' },
                { label: '向下拆分' },
                { label: '向左拆分' },
                { label: '向右拆分' },
                { type: 'separator' },
                { label: '在组中拆分' },
                { type: 'separator' },
                { label: '单列' },
                { label: '双列' },
                { label: '三列' },
                { label: '双行' },
                { label: '三行' },
                { label: '2x2网格' },
                { label: '右侧双行' },
                { label: '底部双列' },
                { type: 'separator' },
                { label: '翻转布局' }
            ]
        },
        { type: 'separator' },
        { label: '资源管理器' },
        { label: '搜索' },
        { label: 'SCM' },
        { label: '运行' },
        { label: '扩展' },
        { type: 'separator' },
        { label: '问题' },
        { label: '输出' },
        { label: '调试控制台' },
        { label: '终端' },
        { type: 'separator' },
        { type: 'checkbox', checked: true, label: '自动换行' },
        { type: 'checkbox', checked: true, label: '显示缩略图' },
        { type: 'checkbox', checked: true, label: '显示导航痕迹' },
        { type: 'checkbox', checked: true, label: '显示空格' },
        { type: 'checkbox', checked: true, label: '显示控制字符' }
    ]
})
const menu_goto = new MenuItem({
    label: '转到(G)',
    submenu: [
        { label: '返回' },
        { label: '前进' },
        { label: '上次编辑位置' },
        { type: 'separator' },
        { label: '切换编辑器',
            submenu: [
                { label: '上一个编辑器' },
                { label: '下一个编辑器' },
                { type: 'separator' },
                { label: '上一个使用过的编辑器' },
                { label: '下一个使用过的编辑器' },
                { type: 'separator' },
                { label: '组中的上一个编辑器' },
                { label: '组中的下一个编辑器' },
                { type: 'separator' },
                { label: '组中的上一个使用过的编辑器' },
                { label: '组中的下一个使用过的编辑器' }
            ]
        },
        { label: '切换组',
            submenu: [
                { label: '1组' },
                { label: '2组' },
                { label: '3组' },
                { label: '4组' },
                { label: '5组' },
                { type: 'separator' },
                { label: '上一个组' },
                { label: '下一个组' },
                { type: 'separator' },
                { label: '左方组' },
                { label: '右方组' },
                { label: '上方组' },
                { label: '下方组' }
            ]
        },
        { type: 'separator' },
        { label: '转到文件...' },
        { label: '转到工作区的符号...' },
        { type: 'separator' },
        { label: '转到编辑器中的符号...' },
        { label: 'Go to Definition' },
        { label: 'Go to Declaration' },
        { label: 'Go to Type Definition' },
        { label: 'Go to Implementations' },
        { label: 'Go to References' },
        { type: 'separator' },
        { label: '转到行/列...' },
        { label: 'Go to Bracket' },
        { type: 'separator' },
        { label: 'Next Problem' },
        { label: 'Previous Problem' },
        { type: 'separator' },
        { label: '下一个更改' },
        { label: '上一个更改' }
    ]
})
const menu_runner = new MenuItem({
    label: '运行(R)',
    submenu: [
        { label: '启动调试' },
        { label: '已非调试模式运行' },
        { type: 'separator' },
        { label: '停止调试' },
        { label: '重启调试' },
        { type: 'separator' },
        { label: '打开配置' },
        { label: '添加配置...' },
        { type: 'separator' },
        { enabled: false, label: '单步跳过' },
        { enabled: false, label: '单步执行' },
        { enabled: false, label: '单步停止' },
        { enabled: false, label: '继续' },
        { type: 'separator' },
        { label: '切换断点' },
        { label: '新建断点',
            submenu: [
                { label: '条件断点' },
                { label: '内联断点' },
                { label: '函数断点' },
                { label: '记录点' }
            ]
        },
        { type: 'separator' },
        { label: '启用所有断点' },
        { label: '禁用所有断点' },
        { label: '删除所有断点' },
        { type: 'separator' },
        { label: '安装附加调试器...' }
    ]
})
const menu_terminal = new MenuItem({
    label: '终端(T)',
    submenu: [
        { label: '新建终端' },
        { label: '拆分终端' },
        { type: 'separator' },
        { label: '运行任务...' },
        { label: '运行生成任务...' },
        { label: '运行活动文件' },
        { label: '运行所选文本' },
        { type: 'separator' },
        { enabled: false, label: '显示正在运行的任务...' },
        { enabled: false, label: '重启正在运行的任务...' },
        { enabled: false, label: '终止任务...' },
        { type: 'separator' },
        { label: '配置任务...' },
        { label: '配置默认生成任务...' }
    ]
})
const menu_help = new MenuItem({
    role: 'help',
    label: '帮助(H)',
    accelerator: process.platform === 'darwin' ? 'Alt + Cmd + I' : 'Alt + Shift + I',
    click: () => {
        console.log('Electron rocks !')
    },
    submenu: [
        { label: '开始' },
        { label: '显示所有命令' },
        { label: '编辑器操场' },
        { label: '文档发行说明' },
        { type: 'separator' },
        { label: '键盘快捷方式参考' },
        { label: '视频教程' },
        { label: '贴士和技巧' },
        { type: 'separator' },
        { label: 'Twitter 上和我们互动' },
        { label: '搜索功能请求' },
        { label: '使用英文报告问题' },
        { type: 'separator' },
        { label: '查看许可证' },
        { label: '隐私声明' },
        { type: 'separator' },
        { role: 'toggleDevTools', label: '切换开发人员工具' },
        { label: '打开进程管理器' },
        { type: 'separator' },
        { label: '关于' },
        { type: 'separator' },
        {
            role: 'window',
            label: '窗口'
        }, {
            role: 'reload',
            label: '重载'
        }
    ]
})
menu.append(menu_file)
menu.append(menu_edit)
menu.append(menu_selector)
menu.append(menu_view)
menu.append(menu_goto)
menu.append(menu_runner)
menu.append(menu_terminal)
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