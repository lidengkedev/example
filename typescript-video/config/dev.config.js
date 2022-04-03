const path = require('path')
const { resolve, rules, plugins, devServer } = require('./config')

module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'main.js'
    },
    devServer,
    mode: 'development',
    resolve,
    module: { rules },
    plugins
}