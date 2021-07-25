import browser from './browser'
import { environment } from './environment'

const permissions = {
    async contains(permission, strict=false) {
        return browser.permissions.contains({
            permissions: [permission],

            //in case of 'tabs' safari needs <all_urls> permission to fully enable it
            //otherwise permission requests will still be asked
            //but instead of <all_urls> be sure to check fully qualified url!

            //also be sure that this request return TRUE only if user gives a full access to all websites, and reload the app/background page, etc...
            ...(strict && permission == 'tabs' && environment.includes('safari') ? {
                origins: ['http://a.com/']
            } : {})
        })
    },

    async request(permission) {
        //in case of 'tabs' safari needs <all_urls> permission to fully enable it
        //otherwise permission requests will still be asked
        if (permission == 'tabs' && environment.includes('safari')) {
            await browser.permissions.request({
                permissions: [permission],
                origins: ['<all_urls>']
            })

            //force to show permission request dialog in safari
            await browser.tabs.query({currentWindow: true})

            //at this point we can't say exactly gived a user an <all_urls> access :(
            return true
        }

        return browser.permissions.request({
            permissions: [permission]
        })
    },

    async remove(permission) {
        return browser.permissions.remove({
            permissions: [permission],

            //in case of 'tabs' safari needs <all_urls> permission to fully enable it
            //otherwise permission requests will still be asked
            ...(permission == 'tabs' && environment.includes('safari') ? {
                origins: ['<all_urls>']
            } : {})
        })
    }
}

//clean up if user doesn't give a full access tabs
//otherwise user will be asked for permission each time he click on browser_action button
if (environment.includes('safari'))
    permissions.contains('tabs', true)
        .then(have=>{
            if (!have)
                return permissions.remove('tabs')
        })
        .catch(console.log)

export { permissions }