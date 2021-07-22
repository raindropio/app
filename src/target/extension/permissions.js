import browser from './browser'
import { environment } from './environment'

function getDetails(permission) {
    return {
        permissions: [permission],

        //in case of 'tabs' safari needs <all_urls> permission to fully enable it
        //otherwise permission requests will still be asked
        ...(permission == 'tabs' && environment.includes('safari') ? {
            origins: ['<all_urls>']
        } : {})
    }
}

const permissions = {
    async contains(permission) {
        let detail = getDetails(permission)

        //in check instead of <all_urls> you need to check exact urls!
        if (detail.origins && detail.origins.length)
            detail.origins = detail.origins.map(origin=>origin == '<all_urls>' ? 'http://a.com/' : origin)

        return browser.permissions.contains(detail)
    },

    async request(permission) {
        return browser.permissions.request(getDetails(permission))
    },

    async remove(permission) {
        return browser.permissions.remove(getDetails(permission))
    }
}

//fix for Safari, to prevent permissions requests all the time (if user originally disallowed access)
permissions.contains('tabs')
    .then(have=>{
        if (!have)
            return permissions.remove('tabs')
    })
    .catch(()=>{})

export { permissions }