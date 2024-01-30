const path = require('path')
const { resolve, rules, plugins } = require('./config')

module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, '../../dist/ts-video'),
        filename: 'main.js'
    },
    mode: 'production',
    resolve,
    module: { rules },
    plugins
}