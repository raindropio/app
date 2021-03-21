//commonjs, because used in extension manifest and index.ejs
module.exports = {
    webPreview: 'https://p.rdl.ink/',

    vendors: {
        sentry: {
            dsn: 'https://c647a147102b4de68dd9dd8690e06840@o199199.ingest.sentry.io/5264532'
        },
        ga: {
            id: 'UA-45127971-1'
        }
    },

    csp: {
        hosts: 'https://*.sentry.io https://sentry.io https://*.google-analytics.com'
    },

    links: {
        app: {
            index: 'https://app.raindrop.io',
            search: 'https://app.raindrop.io/my/0/'
        },
        
        download: 'https://raindrop.io/download',
        blog: 'https://blog.raindrop.io',
        better: 'https://better.raindrop.io',
        twitter: 'https://twitter.com/raindrop_io',
        translation: 'https://crowdin.com/project/raindrop',
        about: 'https://raindrop.io/about',
        home: 'https://raindrop.io',

        help: {
            index: 'https://help.raindrop.io',
            'open-multiple-links': 'https://help.raindrop.io/open-multiple-links',
            'broken-links': 'https://help.raindrop.io/article/41-broken-links-finder',
            zapier: 'https://help.raindrop.io/article/50-zapier',
            import: 'https://help.raindrop.io/article/17-importing-bookmarks',
            omnibox: 'https://help.raindrop.io/article/55-omnibox'
        },

        pro: {
            'buy': `https://raindrop.io/pro/buy?target=${typeof process != 'undefined' && process.env.APP_TARGET}&vendor=${typeof process != 'undefined' && process.env.EXTENSION_VENDOR||''}`,
            'compare': `https://raindrop.io/pro?target=${typeof process != 'undefined' && process.env.APP_TARGET}&vendor=${typeof process != 'undefined' && process.env.EXTENSION_VENDOR||''}`,
            'faq': 'https://help.raindrop.io/category/11-pro-account',
            'help-legacy-subscription': 'https://help.raindrop.io/article/52-legacy-subscription',
            'help-change-billing-cycle': 'https://help.raindrop.io/article/51-change-billing-cycle'
        },

        dev: {
            index: 'https://developer.raindrop.io',
            terms: 'https://developer.raindrop.io/terms',
            token: 'https://developer.raindrop.io/v1/authentication/token',
            github:'https://github.com/raindropio'
        }
    }
}