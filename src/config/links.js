import { target, environment } from '~target'

//safari extension in-app purchase
let overrideProLink = ''
if (target == 'extension' &&
    environment.includes('safari'))
    overrideProLink = 'https://api.raindrop.io/v1/auth/jwt?done_uri=rniomacsafari://subscribe'

export default {
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
        omnibox: 'https://help.raindrop.io/article/55-omnibox',
        'login-problems': 'https://help.raindrop.io/article/10-login-problems'
    },

    pro: {
        'buy': overrideProLink || 'https://raindrop.io/pro/buy',
        'frame': overrideProLink || 'https://raindrop.io/pro?frame=1',
        'compare': overrideProLink || 'https://raindrop.io/pro',
        'faq': 'https://help.raindrop.io/category/11-pro-account',
        'help-legacy-subscription': 'https://help.raindrop.io/article/52-legacy-subscription',
        'help-change-billing-cycle': 'https://help.raindrop.io/article/51-change-billing-cycle'
    },

    dev: {
        index: 'https://developer.raindrop.io',
        terms: 'https://developer.raindrop.io/terms',
        token: 'https://developer.raindrop.io/v1/authentication/token',
        github:'https://github.com/raindropio'
    },

    webPreview: 'https://p.rdl.ink/'
}