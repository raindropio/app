let methods = {}

switch (process.env.APP_TARGET) {
    case 'extension':
        methods = require('./extension')
        break;

    default:
        methods = require('./fallback')
        break;
}

module.exports = {
    ...methods,
    target: process.env.APP_TARGET,
}