module.exports = {
    hosts: 'https://app.raindrop.io https://www.gstatic.com https://recaptcha.net https://www.recaptcha.net https://www.gstatic.cn '+(process.env.SENTRY_RELEASE ? 'https://*.sentry.io https://sentry.io' : '')
}