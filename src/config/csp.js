module.exports = {
    hosts: 'https://app.raindrop.io https://www.google.com https://www.gstatic.com '+(process.env.SENTRY_RELEASE ? 'https://*.sentry.io https://sentry.io' : '')
}