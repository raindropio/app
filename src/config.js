var home = 'raindrop.io';
var host = 'https://'+home;

export default {
    home: home,
	host: host,
    apiPrefix: __DEV__ ? 'http://localhost:3000/v1/' : 'https://api.raindrop.io/v1/',

    webPreview: '//web-preview-prod.exentrich.workers.dev/',

    'links': {
        'download': 'https://raindrop.io/download',
        'help': 'https://help.raindrop.io',
        'blog': 'https://blog.raindrop.io',

        'pro': {
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