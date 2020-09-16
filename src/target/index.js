let methods = require('./fallback')

switch (process.env.APP_TARGET) {
    case 'extension':
        methods = { ...methods, ...require('./extension') }
        break
}

module.exports = {
    ...methods,
    target: process.env.APP_TARGET,
}