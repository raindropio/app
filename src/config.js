export default {
    webPreview: '//p.rdl.ink/',

    vendors: {
        sentry: {
            dsn: 'https://c647a147102b4de68dd9dd8690e06840@o199199.ingest.sentry.io/5264532'
        }
    },

    'links': {
        'download': 'https://raindrop.io/download',
        'blog': 'https://blog.raindrop.io',

        help: {
            index: 'https://help.raindrop.io',
            'open-multiple-links': 'https://help.raindrop.io/open-multiple-links'
        },

        pro: {
            'buy': 'https://raindrop.io/pro/buy',
            'compare': 'https://raindrop.io/pro',
            'faq': 'https://help.raindrop.io/category/11-pro-account',
            'help-legacy-subscription': 'https://help.raindrop.io/article/52-legacy-subscription',
            'help-change-billing-cycle': 'https://help.raindrop.io/article/51-change-billing-cycle'
        }
    },

    getImportLink: function() {
        return this.host+'/app#/settings/import';
    }
}