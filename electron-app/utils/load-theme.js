const path = require('path')

function loadThemeColor (theme) {
    const head = document.getElementsByTagName('head')[0],
    link = document.createElement('link')
    link.href = path.join(__dirname, `../theme/theme-${theme}.css`)
    link.rel = 'stylesheet'
    link.type = 'text/css'
    head.appendChild(link)
}

exports.loadThemeColor = loadThemeColor
exports.module = {}