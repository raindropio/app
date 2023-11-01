import { target, environment } from '~target'

//safari extension in-app purchase
let overrideProLink = ''
if (target == 'extension')
    if (environment.includes('safari-ios'))
        overrideProLink = 'https://api.raindrop.io/v1/auth/jwt?done_uri=raindrop://settings/pro'
    else if (environment.includes('safari'))
        overrideProLink = 'https://api.raindrop.io/v1/auth/jwt?done_uri=rniomacsafari://subscribe'

export default {
    app: {
        index: 'https://app.raindrop.io',
        search: 'https://app.raindrop.io/my/0/',
        import: 'https://app.raindrop.io/settings/import'
    },
    
    download: 'https://raindrop.io/download',
    blog: 'https://blog.raindrop.io',
    better: 'https://better.raindrop.io',
    twitter: 'https://twitter.com/raindrop_io',
    translation: 'https://crowdin.com/project/raindrop',
    home: 'https://raindrop.io',

    help: {
        index: 'https://help.raindrop.io',
        about: 'https://help.raindrop.io/about',
        'open-multiple-links': 'https://help.raindrop.io/bookmarks#open-multiple-links-at-once',
        import: 'https://help.raindrop.io/import',
        omnibox: 'https://help.raindrop.io/browser-extension#search-from-address-bar',
        'saved-indicator': 'https://help.raindrop.io/browser-extension/#saved-indicator',
        'login-problems': 'https://help.raindrop.io/login-problems',
        changelog: 'https://help.raindrop.io/changelog',
        embed: 'https://help.raindrop.io/embed',
        publicPage: 'https://help.raindrop.io/public-page',
        collaboration: 'https://help.raindrop.io/collaboration',
        'add-bookmark': 'https://help.raindrop.io/bookmarks#add-new-bookmark',
        'add-note': 'https://help.raindrop.io/bookmarks#notes',
        search: 'https://help.raindrop.io/using-search',
        tfa: 'https://help.raindrop.io/tfa',
        highlights: {
            index: 'https://help.raindrop.io/highlights',
            addExtension: 'https://help.raindrop.io/highlights/#'+(environment.includes('safari-ios') ? 'add-extension-safari-ios' : 'add-extension')
        },
        backups: {
            automatic: 'https://help.raindrop.io/backups#automatic'
        },
        troubleshooting: {
            brokenLinks: {
                modes: 'https://help.raindrop.io/troubleshooting/false-broken-links/#modes',
            }
        }
    },

    pro: {
        'buy': overrideProLink || 'https://raindrop.io/pro/buy',
        'frame': 'https://raindrop.io/pro?frame=1',
        'compare': overrideProLink || 'https://raindrop.io/pro',
        'faq': 'https://help.raindrop.io/billing-faq',
        'help-legacy-subscription': 'https://help.raindrop.io/article/52-legacy-subscription',
        'help-change-billing-cycle': 'https://help.raindrop.io/change-billing-cycle'
    },

    dev: {
        index: 'https://developer.raindrop.io',
        terms: 'https://developer.raindrop.io/terms',
        token: 'https://developer.raindrop.io/v1/authentication/token',
        github:'https://github.com/raindropio'
    }
}