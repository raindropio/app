export default {
    webPreview: '//p.rdl.ink/',

    vendors: {
        sentry: {
            dsn: 'https://c647a147102b4de68dd9dd8690e06840@o199199.ingest.sentry.io/5264532'
        }
    },

    links: {
        app: 'https://app.raindrop.io',
        download: 'https://raindrop.io/download',
        blog: 'https://blog.raindrop.io',
        twitter: 'https://twitter.com/raindrop_io',
        translation: 'https://crowdin.com/project/raindrop',
        about: 'https://raindrop.io/about',

        help: {
            index: 'https://help.raindrop.io',
            'open-multiple-links': 'https://help.raindrop.io/open-multiple-links',
            'broken-links': 'https://help.raindrop.io/article/41-broken-links-finder',
            zapier: 'https://help.raindrop.io/article/50-zapier',
            import: 'https://help.raindrop.io/article/17-importing-bookmarks'
        },

        pro: {
            'buy': 'https://raindrop.io/pro/buy',
            'compare': 'https://raindrop.io/pro',
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
    },

    getImportLink: function() {
        return this.host+'/app#/settings/import';
    }
}