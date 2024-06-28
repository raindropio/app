module.exports = {
    hosts: 'https://app.raindrop.io https://raindrop.onfastspring.com '+(process.env.SENTRY_RELEASE ? 'https://*.sentry.io https://sentry.io' : '')
}