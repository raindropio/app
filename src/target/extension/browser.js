let browser
if (process.env.APP_TARGET == 'extension')
    browser = require('webextension-polyfill')

export default browser