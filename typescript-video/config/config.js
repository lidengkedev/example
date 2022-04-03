const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// 开发环境服务配置
const devServer = {
    static: "/dist",
    hot: true,
    open: false
}
// 全局样式 文件编译规则配置
const RULES_GLOBAL_CSS_LOADER = {
    test: /\.css$/,
    // style-loader 和 css-loader 是有先后顺序的，style-loader 必须放在前面
    use: ['style-loader', 'css-loader'],
    exclude: [
        // 过滤掉不需要编译的组件的样式
        path.resolve(__dirname, '../src/components')
    ]
}
// 组件样式 文件编译规则配置
const RULES_COMPONENT_CSS_LOADER = {
    test: /\.css$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                // 模块化打包，可以指定打包的CSS的类名生成方式
                // modules: true
                modules: {
                    localIdentName: '[path][name]__[local]--[hash:base64:5]'
                }
            }
        }
    ],
    include: [
        // 指定需要编译的组件样式，这样打包的样式可以与全局样式隔离
        path.resolve(__dirname, '../src/components')
    ]
}
// 图片 文件编译规则配置
const RULES_IMAGES_LOADER = {
    test: /\.(png|jpeg|jpg|gif|svg)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                outputPath: 'img'
            }
        }
    ]
}
// 字体 文件编译规则配置
const RULES_FONT_LOADER = {
    test: /\.(ttf|woff|woff2|eot)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                outputPath: 'font'
            }
        }
    ]
}
// TypeScript 文件编译规则配置
const RULES_TYPESCRIPT_LOADER = {
    test: /\.ts$/,
    use: ['ts-loader'],
    exclude: /node_modules/
}

const rules = [
    RULES_GLOBAL_CSS_LOADER,
    RULES_COMPONENT_CSS_LOADER,
    RULES_IMAGES_LOADER,
    RULES_FONT_LOADER,
    RULES_TYPESCRIPT_LOADER
]
const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: './public/index.html'
    })
]
const resolve = {
    // 指定打包编译的文件时，查找文件后缀的顺序
    // 如果因为是 typescript 项目 所以需要指定 .ts 为第一查找顺序，否则使用 import 引入的 .ts 文件无法找到
    extensions: ['.ts', '.js', '.json']
}

module.exports = {
    devServer,
    resolve,
    rules,
    plugins,
}