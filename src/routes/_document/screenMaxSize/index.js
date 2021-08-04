let Component = require('./fallback')

switch (process.env.APP_TARGET) {
    case 'extension':
        Component = require('./extension')
        break
}

module.exports = Component